// eslint-disable-next-line
const langs = '<%= options.langs %>'.split(',')
function getFallbackLang(lang) {
  if (!langs.includes(lang)) {
    return langs[0]
  } else {
    return lang
  }
}
export default ({ app }, inject) => {
  inject('templatesLangs', { getFallbackLang })
}
