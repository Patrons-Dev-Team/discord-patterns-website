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
    switch (lang) {
      case 'us':
      default:
        templates = (await import('~/data/templates/templates.us')).templates
        for (let i = 2; i < 300; i++) {
          templates.push({ ...templates[0], id: i })
        }
        return templates
    }
  },

  async getLatestTemplates(lang) {
    const templates = await this.getAllTemplates(lang)
    return templates.slice(0, 9)
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
              tokenize: 'forward'
            },
            description: {
              encode: 'simple',
              tokenize: 'forward'
            }
          }
        }
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
        page: `${options.page}`
      })
    }
    const sortFunc = getSortFunction(options.sort, options.sortDesc)
    results.result = results.result
      .filter((template) =>
        tags.every((searchTag) => template.tags.includes(searchTag))
      )
      .sort(sortFunc)
    return results
  }
}

function getSortFunction(sort, sortDesc) {
  switch (sort) {
    case sort === 'most-recent' && !sortDesc:
      return sortByUpdatedTime

    case sort === 'most-recent' && sortDesc:
      return sortByUpdatedTimeDesc

    case sort === 'most-popular' && !sortDesc:
      return sortByUses

    case sort === 'most-popular' && sortDesc:
      return sortByUsesDesc

    case sort === 'alphabetical' && !sortDesc:
      return sortByTitle

    case sort === 'alphabetical' && sortDesc:
      return sortByTitleDesc
    default:
      return sortByUpdatedTimeDesc
  }
}
function sortByUpdatedTime(a, b) {
  return new Date(a.dprops.updated_at) - new Date(b.dpops.updated_at)
}

function sortByUpdatedTimeDesc(a, b) {
  return new Date(b.dprops.updated_at) - new Date(a.dprops.updated_at)
}

function sortByUses(a, b) {
  return a.dpops.usage_count - b.dpops.usage_count
}

function sortByUsesDesc(a, b) {
  return b.dpops.usage_count - a.dpops.usage_count
}

function sortByTitle(a, b) {
  return a.title - b.title
}

function sortByTitleDesc(a, b) {
  return a.title - b.title
}
