import FlexSearch from 'flexsearch'
let templates = null
let lastLang = null
let index = null
export default {
  async getAllTemplates(lang) {
    if (lastLang !== lang) {
      lastLang = lang
      templates = null
    }
    if (templates) {
      return templates
    }
    try {
      templates = (
        await import(
          /* webpackChunkName: "templatedata" */ `~/data/templates/templates.${lang}.json`
        )
      ).default
    } catch (e) {
      templates = (
        await import(
          /* webpackChunkName: "templatedata" */ `~/data/templates/templates.us.json`
        )
      ).default
    }
    return templates
  },

  async getLatestTemplates(lang) {
    const templates = await this.getAllTemplates(lang)
    return templates.slice(0, 9)
  },

  async getTemplateById(lang, id) {
    const templates = await this.getAllTemplates(lang)
    const template = templates.find((temp) => temp.id === id)
    return template
  },

  async search(lang, query, tags, options) {
    const templates = await this.getAllTemplates(lang)
    let results = []
    if (!index) {
      index = new FlexSearch('memory', {
        async: true,
        doc: {
          id: 'id',
          field: {
            title: {
              encode: 'simple',
              tokenize: 'forward',
            },
            description: {
              encode: 'simple',
              tokenize: 'forward',
            },
          },
        },
      })
      for (const template of templates) {
        index.add(template)
      }
    }
    if (!query) {
      results = { page: '0', result: templates, next: null }
    } else {
      results = await index.search(query, {
        limit: options.itemsPerPage,
        page: `${options.page}`,
      })
    }
    const sortFunc = getSortFunction(options.sortBy, options.sortDesc)
    results.result = results.result
      .filter((template) =>
        tags.every((searchTag) => template.tags.includes(searchTag))
      )
      .sort(sortFunc)
    return results
  },
}

function getSortFunction(sort, sortDesc) {
  if (sort === 'most-recent' && !sortDesc) {
    return sortByUpdatedTime
  } else if (sort === 'most-popular' && !sortDesc) {
    return sortByUses
  } else if (sort === 'most-popular' && sortDesc) {
    return sortByUsesDesc
  } else if (sort === 'alphabetical' && !sortDesc) {
    return sortByTitle
  } else if (sort === 'alphabetical' && sortDesc) {
    return sortByTitleDesc
  } else {
    return sortByUpdatedTimeDesc
  }
}
function sortByUpdatedTime(a, b) {
  return new Date(a.dprops.updated_at) - new Date(b.dprops.updated_at)
}

function sortByUpdatedTimeDesc(a, b) {
  return new Date(b.dprops.updated_at) - new Date(a.dprops.updated_at)
}

function sortByUses(a, b) {
  return a.dprops.usage_count - b.dprops.usage_count
}

function sortByUsesDesc(a, b) {
  return b.dprops.usage_count - a.dprops.usage_count
}

function sortByTitle(a, b) {
  return a.title === b.title ? 0 : +(a.title > b.title) || -1
}

function sortByTitleDesc(a, b) {
  return b.title === a.title ? 0 : +(b.title > a.title) || -1
}
