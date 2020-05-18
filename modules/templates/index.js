import { resolve } from 'path'
import { logger, getAllTemplates } from './utils'
import templateRoutesGenerator from './generate-template-routes'

import {
  startServer,
  generateLangThumbnails,
  stopServer,
  copyTemplates,
  getThumbnailsToGenerate
} from './thumbnail-generate'

const cachePath = resolve(__dirname, '../../.thumbnails/entries')
const rootDir = resolve(__dirname, '../../')
export default async function templatesModule(moduleOptions) {
  const distDir = this.options.generate.dir
  for (const lang of this.options.i18n.locales.map((locale) => locale.code)) {
    const templates = await getAllTemplates(lang)
    logger.info(`${templates.length} templates for ${lang} locale`)
    this.nuxt.hook('generate:extendRoutes', (routes) => {
      templateRoutesGenerator(
        this.options.i18n.defaultLocale === lang ? null : lang,
        templates,
        routes
      )
      logger.info(`Added payloads and generate routes for ${lang} templates`)
    })
  }
  this.nuxt.hook('generate:extendRoutes', (routes) => {
    logger.info(`${routes.length} routes to generate`)
  })
  this.nuxt.hook('generate:done', async () => {
    let isServerStarted = false
    for (const lang of moduleOptions.langs) {
      const templates = await getAllTemplates(lang)
      logger.success(`Generated oembeds for lang ${lang}`)
      const templatesToGenerates = getThumbnailsToGenerate(
        cachePath,
        lang,
        templates
      )

      if (templatesToGenerates.length > 0) {
        if (!isServerStarted) {
          await startServer()
          isServerStarted = true
        }
        await generateLangThumbnails(
          rootDir,
          templatesToGenerates,
          lang,
          this.options.i18n.defaultLocale === lang
        )
      }
    }
    if (isServerStarted) {
      stopServer()
    }
    copyTemplates(rootDir, distDir)
  })
  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    options: {
      langs: moduleOptions.langs
    }
  })
}

module.exports.meta = {
  name: 'template'
}
