import { join } from 'path'
const writeJsonFile = require('write-json-file')
const pLimit = require('p-limit')

export default async function(distDir, templates, lang) {
  const promises = []
  const limit = pLimit(100)
  for (const template of templates) {
    promises.push(
      limit(() =>
        writeJsonFile(
          join(distDir, `oembeds/${lang}-template.${template.id}.json`),
          getOembed(template)
        )
      )
    )
  }
  await Promise.all(promises)
}

function getOembed(template) {
  return {
    version: '1.0',
    title: template.title,
    author_name: `${template.dprops.creator.username}#${template.dprops.creator.discriminator}`,
    provider_name: 'Discord Patterns'
  }
}
