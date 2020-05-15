export const logger = require('consola').withScope('template/module')
export function getAllTemplates(lang) {
  let templates = null
  try {
    templates = require(`../../data/templates/templates.${lang}`).templates
  } catch (e) {
    logger.warn(`Falling back to us templates for ${lang} locale`)
    templates = require(`../../data/templates/templates.us`).templates
  }
  if (templates.length < 200) {
    for (let i = 2; i < 300; i++) {
      templates.push({ ...templates[0], id: String(i) })
    }
  }
  return templates
}
