import PromiseWorker from 'promise-worker'
let worker = null
export default {
  async getWorker() {
    if (!worker) {
      const Worker = (
        await import(
          /* webpackPreload: true */ '~/services/api/templates.worker'
        )
      ).default
      worker = new PromiseWorker(new Worker())
    }
    return worker
  },
  async getAllTemplates(lang) {
    return await (await this.getWorker()).postMessage({
      type: 'getAllTemplates',
      data: { lang },
    })
  },

  async getLatestTemplates(lang) {
    return await (await this.getWorker()).postMessage({
      type: 'getLatestTemplates',
      data: { lang },
    })
  },

  async getTemplateById(lang, id) {
    return await (await this.getWorker()).postMessage({
      type: 'getTemplateById',
      data: { lang, id },
    })
  },

  async search(lang, query, tags, options) {
    return await (await this.getWorker()).postMessage({
      type: 'search',
      data: { lang, query, tags, options },
    })
  },
}
