import colors from 'vuetify/es5/util/colors'

export default {
  dev: false,
  telemetry: false,
  ignore: [
    'pages/index.vue',
    'pages/browse.vue',
    'pages/preview.vue',
    'pages/template/_id/index.vue',
    'pages/template/_id/tutorial/*',
    'layouts/default.vue',
    'layouts/dense.vue',
    'pages/about.vue',
    'pages/theteam.vue',
  ],
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - Discord Patterns',
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Generate part
   */
  generate: {
    dir: 'public',
    concurrency: 150,
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
    { src: '~/plugins/api-client.js', mode: 'client' },
    { src: '~/plugins/api-server.js', mode: 'server' },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    // '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    // '@nuxtjs/dotenv',
    // Doc: https://nuxt-community.github.io/nuxt-i18n/
    'nuxt-i18n',
    // Doc: https://github.com/nandenjin/nuxt-cache-payload
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
    treeShake: false,
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
          success: colors.green.accent3,
        },
      },
    },
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
        file: 'en-US.js',
      },
      {
        code: 'fr',
        iso: 'fr-FR',
        file: 'fr-FR.js',
      },
    ],
    defaultLocale: 'us',
    vueI18n: {
      fallbackLocale: 'us',
    },
    lazy: true,
    langDir: 'lang/',
  },
  /*
   ** Build configuration
   */
  build: {
    extend(config, { isClient }) {
      if (isClient) {
        config.output.globalObject = 'this'
        // web workers are only available client-side
        config.module.rules.push({
          test: /\.worker\.js$/, // this will pick up all .js files that ends with ".worker.js"
          loader: 'worker-loader',
          exclude: /(node_modules)/,
        })
      }
    },
    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: false,
        minifyJS: false,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true,
      },
    },
    quiet: true,
  },
  /*
   ** Client side env variables
   */
  env: {
    VERSION: process.env.npm_package_version,
    APP_TITLE: 'Discord Patterns',
  },
}
