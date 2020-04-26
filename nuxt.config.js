import colors from 'vuetify/es5/util/colors'
import GitRevisionPlugin from 'git-revision-webpack-plugin'
const gitRevisionPlugin = new GitRevisionPlugin()

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Generate part
   */
  generate: {
    dir: 'public'
  },
  /**
   * Customize the base url
   */
  router: {
    base: '/discord-patterns-website/'
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    // Doc: https://vue-discord-message.netlify.app/
    // 'vue-discord-message'
    { src: '~/plugins/vue-discord-message.js', mode: 'client' }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Doc: https://nuxt-community.github.io/nuxt-i18n/
    'nuxt-i18n'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    treeShake: true,
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
   ** nuxt-i18n module configuration
   ** https://nuxt-community.github.io/nuxt-i18n/options-reference.html
   */
  i18n: {
    locales: [
      {
        code: 'us',
        iso: 'en-US',
        file: 'en-US.js'
      },
      {
        code: 'fr',
        iso: 'fr-FR',
        file: 'fr-FR.js'
      }
    ],
    defaultLocale: 'us',
    vueI18n: {
      fallbackLocale: 'us'
    },
    seo: true,
    lazy: true,
    langDir: 'lang/'
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  /*
   ** Client side env variables
   */
  env: {
    VERSION: process.env.npm_package_version,
    GIT_DESCRIBE_VERSION: gitRevisionPlugin.version(),
    COMMITHASH: gitRevisionPlugin.commithash(),
    BRANCH: gitRevisionPlugin.branch(),
    APP_TITLE: 'Discord Patterns'
  }
}
