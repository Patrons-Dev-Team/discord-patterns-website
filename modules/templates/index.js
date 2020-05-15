import { resolve } from 'path'
import { logger, getAllTemplates } from './utils'
import oembedGenerator from './oembed-generate'
import templateRoutesGenerator from './generate-template-routes'
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

    this.nuxt.hook('generate:extendRoutes', (routes) => {
      logger.info(`${routes.length} routes to generate`)
    })

    this.nuxt.hook('generate:done', async (generator) => {
      await oembedGenerator(distDir, templates, lang)
      logger.success(`Generated oembeds for lang ${lang}`)
    })
  }
  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    options: {
      langs: moduleOptions.langs
    }
  })
}
