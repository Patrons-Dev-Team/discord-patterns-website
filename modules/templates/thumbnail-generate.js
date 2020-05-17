import { join, resolve } from 'path'
import { Nuxt, Builder } from 'nuxt'
import captureWebsite from 'capture-website'
import pLimit from 'p-limit'
import { ensureDir, copy } from 'fs-extra'
import { logger } from './utils'

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

export async function generateThumbnails(dir, templates, lang, isFallback) {
  const prefix = !isFallback ? `/${lang}` : ''

  await ensureDir(join(dir, '.thumbnails'))

  const promises = []
  const limit = pLimit(5)
  for (const template of templates) {
    promises.push(
      limit(() =>
        captureWebsite.file(
          `http://localhost:4444${prefix}/template/${template.id}/cpreview`,
          join(dir, `.thumbnails/${lang}-template.${template.id}.png`),
          {
            launchOptions: {
              args: ['--no-sandbox', '--disable-setuid-sandbox']
            },
            waitForElement: '#loaded-trigger'
          }
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
