export function validateBrowseQuery(query) {
  if (query.page && !/^\d+$/.test(query.page)) {
    return false
  }
  if (
    query.sort &&
    !/^most-recent|most-popular|alphabetical$/.test(query.sort)
  ) {
    return false
  }
  if (query.order && !/^[0-1]$/.test(query.order)) {
    return false
  }

  if (query.tags) {
    if (!Array.isArray(query.tags) && !/^\d+$/.test(query.tags)) {
      return false
    } else if (
      Array.isArray(query.tags) &&
      query.tags.filter((tag) => !/^\d+$/.test(tag)).length > 0
    ) {
      return false
    }
  }
  return true
}

export function getDefaultBrowseOrder(sort) {
  switch (sort) {
    case 'alphabetical':
      return 0
    default:
      return 1
  }
}
