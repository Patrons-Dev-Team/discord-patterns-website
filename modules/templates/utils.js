export const logger = require('consola').withScope('template/module')
export function getAllTemplates(lang) {
  let templates = null
  try {
    templates = require(`../../data/templates/templates.${lang}.json`)
  } catch (e) {
    logger.warn(`Falling back to us templates for ${lang} locale`)
    templates = require(`../../data/templates/templates.us.json`)
  }
  return templates
}
