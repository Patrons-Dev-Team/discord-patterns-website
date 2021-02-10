export default function (lang, templates, routes) {
  const prefix = lang ? `/${lang}` : ''
  for (const template of templates) {
    routes.push({
      route: `${prefix}/template/${template.id}`,
      payload: template,
    })
    routes.push({
      route: `${prefix}/template/${template.id}/tutorial`,
      payload: template,
    })
  }
  routes.push({
    route: `${prefix}/about/`,
  })
  routes.push({
    route: prefix || '/',
    payload: templates
      .sort(
        (a, b) => new Date(b.dprops.updated_at) - new Date(a.dprops.updated_at)
      )
      .slice(0, 9),
  })
  routes = routes.map(
    (obj) => (obj.route += obj.route.endsWith('/') ? '' : '/')
  )
}
