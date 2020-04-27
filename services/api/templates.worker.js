import registerPromiseWorker from 'promise-worker/register'
import templatesApi from '~/services/api/templates'
registerPromiseWorker(async function(obj) {
  switch (obj.type) {
    case 'getAllTemplates':
      return await templatesApi.getAllTemplates(obj.data.lang)
    case 'getLatestTemplates':
      return await templatesApi.getLatestTemplates(obj.data.lang)
    case 'getTemplateById':
      return await templatesApi.getTemplateById(obj.data.lang, obj.data.id)
    case 'search':
      return await templatesApi.search(
        obj.data.lang,
        obj.data.query,
        obj.data.tags,
        obj.data.options
      )
    default:
      throw new Error('Unsupported API method')
  }
})
