import {resolve} from "path";

export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: "nx-books",
        htmlAttrs: {
            lang: "en",
        },
        meta: [
            {charset: "utf-8"},
            {name: "viewport", content: "width=device-width, initial-scale=1"},
            {hid: "description", name: "description", content: ""},
            {name: "format-detection", content: "telephone=no"},
        ],
        link: [{rel: "icon", type: "image/x-icon", href: "/favicon.ico"}],
    },

    alias: {
        "@": resolve(__dirname, "./components/"),
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ["~assets/scss/my.scss"],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        "@nuxtjs/axios",
        '@nuxtjs/auth-next'
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
        baseURL: "https://localhost:8088/api",
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},
    auth: {
        strategies: {
            local: {
                token: {
                    property: 'token',
                    global: true,
                    // required: true,
                    // type: 'Bearer'
                },
                user: {
                    property: 'user',
                    // autoFetch: true
                },
                endpoints: {
                    login: { url: '/login', method: 'post' },
                    logout: { url: '/api/auth/logout', method: 'post' },
                    user: { url: '/api/auth/me', method: 'get' }
                }
            }
        }
    }
};
