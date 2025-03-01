const fs = require('fs')
const path = require('path')

export default {
  head: {
    titleTemplate: '%s | ' + process.env.TITLE,
    title: process.env.TITLE,
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
      }, // prevent ios auto scale
      { hid: 'description', name: 'description', content: process.env.TITLE },
      {
        name: 'format-detection',
        content: 'telephone=no, email=no, address=no, date=no',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'stylesheet', href: 'https://unpkg.com/flickity@2/dist/flickity.min.css' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', crossorigin: true, href: 'https://fonts.gstatic.com' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Urbanist:wght@100..900&display=swap' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap' }
    ],
    script: [
      { src: "https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js", defer: true, },
      { src: "https://cdn.jsdelivr.net/npm/country-list-with-dial-code-and-flag@5.1.0/dist/main.min.js", defer: true, },
      { src: "https://cdn.jsdelivr.net/npm/country-list-with-dial-code-and-flag/dist/country-flag-svg.js", defer: true, }
    ]
  },

  css: [
    'font-awesome/css/font-awesome.min.css',
    // Have to restart dev server to load newly added file
    ...fs.readdirSync(path.join(__dirname, 'assets/css'))
      .filter(file => file.match(/\.(css|scss)$/))
      .map(file => `~/assets/css/${file}`),
  ],

  plugins: [
    "~/plugins/modal.js",
    "~/plugins/filters.js",
    { src: '~/plugins/vlite.js', mode: 'client' },

    //directives
    "~/directives/autofocus.js",

    // Keep at the end
    "~/plugins/global.js",
  ],

  components: [
    '~/components',
    {
      path: '~/components/common',
      prefix: '',
    },
  ],

  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/dotenv',
    "@nuxtjs/svg"
  ],

  modules: [

  ],

  vuetify: {
    customVariables: ['~/assets/css/vuetify/variables.scss'],
    theme: {
      themes: {
        light: {
          // primary: process.env.PRIMARY_COLOR,
          // secondary: process.env.SECONDARY_COLOR,
        },
      },
    },
    treeShake: true,
    options: {
      customProperties: true,
    },
    defaultAssets: {
      font: {
        family: 'Inter',
      },
    },
    icons: {
      iconfont: 'fa4',
    },
  },

  build: {
    plugins: [

    ],
    babel: {
      babelrc: false,
      compact: false,
    },
  },

  router: {
    base: '/',
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
  },

  loadingIndicator: {
    name: 'fading-circle',
    color: process.env.SECONDARY_COLOR,
    background: process.env.PRIMARY_COLOR,
  },

  server: {
    host: '0.0.0.0', // Default: localhost
    port: 3000, // Default: 3000
  },
}
