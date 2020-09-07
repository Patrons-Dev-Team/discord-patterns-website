import { resolve } from 'path'
import FMMode from 'frontmatter-markdown-loader/mode'
import colors from 'vuetify/es5/util/colors'
import pify from 'pify'
import { analyze } from 'vizion'
const analyzeGit = pify(analyze)
const base = process.env.BASE_URL || '/discord-patterns-website/' // for vercel
export default async () => {
  const meta = await analyzeGit({
    folder: resolve(__dirname),
  }).catch(() => {
    return {
      revision: 'unknown',
      branch: 'unknown',
    }
  })
  return {
    mode: 'universal',
    ignore: ['pages/template/_id/cpreview/*'],
    /*
     ** Headers of the page
     */
    head: {
      titleTemplate: '%s - Discord Patterns',
      title: process.env.npm_package_name || '',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: process.env.npm_package_description || '',
        },
        {
          hid: 'og:site_name',
          name: 'og:site_name',
          content: 'Discord patterns',
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: base + 'discord-patterns-banner.png',
        },
        {
          hid: 'og:image:type',
          name: 'og:image:type',
          content: 'image/png',
        },
        {
          hid: 'og:image:width',
          name: 'og:image:width',
          content: '500',
        },
        {
          hid: 'og:image:height',
          name: 'og:image:height',
          content: '500',
        },
        {
          hid: 'twitter:site',
          name: 'twitter:site',
          content: '@d-patterns',
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: base + 'discord-patterns-banner.png',
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          hid: 'theme-color',
          name: 'theme-color',
          content: '#7289DA',
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: base + 'favicon.ico' }],
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
    router: {
      /**
       * Customize the base url
       */
      base,
      trailingSlash: true,
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
      { src: '~/plugins/vue-discord-message.js', mode: 'client' },
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
      [
        '~/modules/templates/',
        {
          langs: ['us', 'fr'],
        },
      ],
      // Doc: https://github.com/aceforth/nuxt-optimized-images
      '@aceforth/nuxt-optimized-images',
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
      'nuxt-cache-payload',
      'nuxt-webfontloader',
      // Doc: https://github.com/nuxt-community/sitemap-module
      '@nuxtjs/sitemap',
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
            success: colors.green.accent3,
            roleModal: colors.grey.darken4,
            footerLink: colors.shades.white,
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
      seo: true,
      lazy: true,
      langDir: 'lang/',
    },
    /*
     ** nuxt-optimized-images module configuration
     ** Doc: https://aceforth.com/docs/nuxt-optimized-images/configuration/
     */
    optimizedImages: {
      optimizeImages: true,
      mozjpeg: {
        quality: 85,
      },
      optipng: false,
      pngquant: {
        speed: 7,
        quality: [0.65, 0.8],
      },
      webp: {
        quality: 85,
      },
    },
    /*
     ** nuxt-site module configuration
     ** https://github.com/nuxt-community/sitemap-module#sitemap-options
     */
    sitemap: {
      hostname: 'https://d-patterns.js.org',
      // shortcut notation (basic)
      i18n: 'en',
    },
    /*
     ** Build configuration
     */
    build: {
      /*
       ** You can extend webpack config here
       */
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
        config.module.rules.push({
          test: /\.md$/,
          loader: 'frontmatter-markdown-loader',
          options: {
            mode: [FMMode.VUE_COMPONENT],
          },
        })
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
    },
    /*
     ** Client side env variables
     */
    env: {
      VERSION: process.env.npm_package_version,
      COMMITHASH: meta.revision,
      BRANCH: meta.branch,
      APP_TITLE: 'Discord Patterns',
    },
  }
}
