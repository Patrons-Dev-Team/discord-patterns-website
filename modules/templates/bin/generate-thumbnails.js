#!/usr/bin/env node
const { basename, join } = require('path')
const consola = require('consola')
const { NuxtCommand } = require('@nuxt/cli')
const fg = require('fast-glob')
// eslint-disable-next-line no-global-assign
require = require('esm')(module)
const thumbnails = require('../thumbnail-generate.js')
const { getAllTemplates } = require('../utils.js')
const configFile = require(join(process.cwd(), 'nuxt.config.js')).default

NuxtCommand.run({
  name: 'thumbnails',
  description: 'Generate thumbnails',
  usage: 'thumbnails',
  options: {
    dir: {
      type: 'string',
      description: 'thumbnails cache'
    },
    concurrent: {
      description:
        'Number of browser to launch in parallel to generate templates'
    }
  },
  async run(cmd) {
    const config = await configFile()
    const rootDir = process.cwd()
    const cachePath = join(rootDir, cmd.argv.dir || '.thumbnails/entries')
    const langs = await (
      await fg(['data/templates/templates.*.*'], { dot: true })
    ).map((path) => /templates\.(.*)\./.exec(basename(path))[1])
    let isServerStarted = false
    for (const lang of langs) {
      consola.info(`Detected lang ${lang}`)
      const templates = await getAllTemplates(lang)
      const templatesToGenerates = await thumbnails.getThumbnailsToGenerate(
        cachePath,
        lang,
        templates
      )

      if (templatesToGenerates.length > 0) {
        consola.info(
          `${templatesToGenerates.length} thumbnails to generate for lang ${lang}`
        )
        if (!isServerStarted) {
          await thumbnails.startServer()
          isServerStarted = true
        }
        await thumbnails.generateLangThumbnails(
          rootDir,
          templatesToGenerates,
          lang,
          config.i18n.defaultLocale === lang,
          cmd.argv.concurrent
        )
      } else {
        consola.info(`Nothing to generate for lang ${lang}`)
      }
    }
    if (isServerStarted) {
      thumbnails.stopServer()
    }
  }
})
