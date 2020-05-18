const { join, resolve } = require('path')
const { Nuxt, Builder } = require('nuxt')
const cacache = require('cacache')
const hash = require('object-hash')
const captureWebsite = require('capture-website')
const pLimit = require('p-limit')
const pRetry = require('p-retry')
const { ensureDir, copy, pathExists } = require('fs-extra')
const { logger } = require('./utils')

let nuxt = null

export async function startServer() {
  logger.info('Launching light thumbnail server')
  const nuxtConf = require('./thumbnail-nuxt.config').default
  nuxtConf.rootDir = resolve(__dirname, '../../')
  nuxt = new Nuxt(nuxtConf)
  await new Builder(nuxt).build()
  nuxt.listen(4444, 'localhost')
  logger.info('Listening on port 4444')
}

export function stopServer() {
  nuxt.close()
}

export async function generateThumbnails() {}

export async function generateLangThumbnails(
  dir,
  templates,
  lang,
  isFallback,
  concurrency = 5
) {
  const prefix = !isFallback ? `/${lang}` : ''

  await ensureDir(join(dir, '.thumbnails'))

  const promises = []
  const limit = pLimit(concurrency)
  for (const template of templates) {
    promises.push(
      limit(() =>
        pRetry(
          () =>
            captureWebsite.file(
              `http://localhost:4444${prefix}/template/${template.id}/cpreview`,
              join(dir, `.thumbnails/${lang}-template.${template.id}.png`),
              {
                launchOptions: {
                  args: ['--no-sandbox', '--disable-setuid-sandbox']
                },
                waitForElement: '#loaded-trigger',
                overwrite: true,
                timeout: 30,
                width: 1280,
                height: 800,
                scaleFactor: 1
              }
            ),
          { retries: 3 }
        )
      )
    )
  }
  await Promise.all(promises)
}

export async function copyTemplates(dir, distDir) {
  const src = join(dir, '.thumbnails')
  await ensureDir(src)
  await copy(src, join(distDir, 'thumbnails'))
}

export async function getThumbnailsToGenerate(cachePath, lang, templates) {
  const templatesToGenerates = []
  for (const template of templates) {
    const templateHash = hash(template)
    if (
      (
        await cacache.get(cachePath, `${lang}-${template.id}`).catch(() => {
          return { data: Buffer.from('') }
        })
      ).data.toString() !== templateHash ||
      !(await pathExists(
        join(cachePath, `../${lang}-template.${template.id}.png`)
      ))
    ) {
      templatesToGenerates.push(template)
      await cacache.put(cachePath, `${lang}-${template.id}`, templateHash)
    }
  }
  return templatesToGenerates
}
