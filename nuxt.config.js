import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + 'Gebbles',
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/gebbleslogo.png' },
      // { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poiret+One&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,900&family=Sacramento&display=swap' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
    //  loading: '~/components/Loading.vue',
  loading: { color: '#E1C951' },
  /*
  ** Global CSS
  */
  css: ["~/assets/style.css", "~layouts/global.css",],
  /*
  ** Plugins to load before mounting the App
  */
 plugins: [
  { src: '~/plugins/vuex-persist', ssr: false },
  { src: "~/plugins/aos.client"}
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    //'@nuxtjs/eslint-module',
    //'@nuxtjs/prettier',
    '@nuxtjs/vuetify',
    '@nuxtjs/style-resources',
    // '@braid/vue-formulate/nuxt'
  ],
  /*
  ** Nuxt.js modules
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          
          background: '#f3f4f7' ,
          primary: '#3f51b5',
          secondary: '#b0bec5',
          accent: '#8c9eff',
          error: '#b71c1c',
        },
      }
    }
  },
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/auth'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: 'https://2t580xq9u5.execute-api.us-east-2.amazonaws.com/dev/api/',
    // credentials: true
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {},
    transpile:['vue-youtube-embed', 'vuex-persist'],
  },
  //nuxt auth module for authenticating users.
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: 'v1/auth/login/', method: 'post', propertyName: 'token' },
          refresh: { url: 'v1/auth/refresh', method: 'post', propertyName: false },
          logout: {url: 'v1/auth/logout/', method: 'post'},
          user: { url: 'v1/auth/user/', method: 'post' }
        },
        tokenType: ''
      }
    }
  }
}

const path = require('path')
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'bootstrap-components': path.resolve(__dirname, 'node_modules/bootstrap-vue/es/components')
      }
    }
  },
}
// sometimes u cant see nuxt home page even if 
// it is running ---- change the network and port number in the package.json file 
//https://stackoverflow.com/questions/53909900/my-first-nuxt-js-app-is-refusing-to-run-on-localhost3000 
// also check https://nuxtjs.org/faq/host-port/