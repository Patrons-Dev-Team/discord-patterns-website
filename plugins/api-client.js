import templatesApi from '~/services/api/templates.worker-interface'
export default ({ app }, inject) => {
  inject('templatesApi', templatesApi)
}
