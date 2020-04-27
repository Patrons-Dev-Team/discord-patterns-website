// eslint-disable-next-line import/no-webpack-loader-syntax
import templatesApi from '~/services/api/templates'

export default ({ app }, inject) => {
  inject('templatesApi', templatesApi)
}
