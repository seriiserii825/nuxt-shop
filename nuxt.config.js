export default {
  env: {
    WP_URL: "https://cdn2.bludelego.it",
    baseUrl: process.env.BASE_URL
  },
  server: {
    port: process.env.PORT,
    host: "localhost"
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "bludelego",
    htmlAttrs: {
      lang: "it"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["element-ui/lib/theme-chalk/index.css", "~/assets/scss/my.scss"],
  loading: {
    color: "blue",
    height: "3px"
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "@/plugins/globals",
    { src: '@/plugins/mavon-editor', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/svg"],
  // Modules: https://go.nuxtjs.dev/config-modules
  image: {
    // Generate images to `/_nuxt/image/file.png`
    // staticFilename: 'static/images/[name]-[hash][ext]'
  },
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    '@tui-nuxt/editor',
    "@nuxtjs/auth-next",
    '@nuxt/image',
    [
      "nuxt-i18n",
      {
        detectBrowserLanguage: {
          useCookie: true,
          cookieKey: "i18n_redirected",
          onlyOnRoot: true, // recommended
          alwaysRedirect: false,
          fallbackLocale: "en"
        },
        locales: [
          {
            name: "Italiano",
            code: "it",
            iso: "it-IT",
            file: "it-IT.js"
          },
          {
            name: "English",
            code: "en",
            iso: "en-US",
            file: "en-US.js"
          }
        ],
        parsePages: false, // Disable babel parsing
        pages: {
          ["clienti"]: {
            it: "/clienti", // -> accessible at /about-us (no prefix since it's the default locale)
            en: "/clients" // -> accessible at /about-us (no prefix since it's the default locale)
          },
          ["contatti"]: {
            it: "/contatti", // -> accessible at /about-us (no prefix since it's the default locale)
            en: "/contacts" // -> accessible at /about-us (no prefix since it's the default locale)
          },
          ["chi-siamo"]: {
            it: "/chi-siamo", // -> accessible at /about-us (no prefix since it's the default locale)
            en: "/about-us" // -> accessible at /about-us (no prefix since it's the default locale)
          },
          ["web-e-digital"]: {
            it: "/web-e-digital", // -> accessible at /about-us (no prefix since it's the default locale)
            en: "/web-and-digital" // -> accessible at /about-us (no prefix since it's the default locale)
          }
        },
        lazy: true,
        langDir: "lang/",
        defaultLocale: "it"
      }
    ]
  ],
  tui: {
    editor: {
      stylesheet: {
        editor: 'tui-editor/dist/tui-editor.min.css',
        contents: 'tui-editor/dist/tui-editor-contents.min.css',
        codemirror: 'codemirror/lib/codemirror.css',
        codeHighlight: 'highlight.js/styles/github.css',
      }
    }
  },
  router: { prefetchLinks: false },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true
  },
  proxy: {
    "/api/": process.env.BASE_URL
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
    extractCSS: true
  },
  auth: {
    strategies: {
      local: {
        token: {
          property: "token",
          global: true
          // required: true,
          // type: 'Bearer'
        },
        user: {
          property: "user"
          // autoFetch: true
        },
        endpoints: {
          login: { url: "/api/auth/login", method: "post" },
          logout: { url: "/api/auth/logout", method: "post" },
          user: { url: "/api/auth/user", method: "get" }
        }
      }
    }
  }
};
