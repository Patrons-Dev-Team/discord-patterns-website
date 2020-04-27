import PromiseWorker from 'promise-worker'
import Worker from '~/services/api/templates.worker'
const promisedWorker = new PromiseWorker(new Worker())

export default {
  async getAllTemplates(lang) {
    return await promisedWorker.postMessage({
      type: 'getAllTemplates',
      data: { lang }
    })
  },

  async getLatestTemplates(lang) {
    return await promisedWorker.postMessage({
      type: 'getLatestTemplates',
      data: { lang }
    })
  },

  async getTemplateById(lang, id) {
    return await promisedWorker.postMessage({
      type: 'getTemplateById',
      data: { lang, id }
    })
  },

  async search(lang, query, tags, options) {
    return await promisedWorker.postMessage({
      type: 'search',
      data: { lang, query, tags, options }
    })
  }
}
