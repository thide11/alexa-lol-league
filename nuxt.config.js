export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  // head: {
  //   title: 'nuxt-treinamento',
  //   htmlAttrs: {
  //     lang: 'en'
  //   },
  //   meta: [
  //     { charset: 'utf-8' },
  //     { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  //     { hid: 'description', name: 'description', content: '' },
  //     { name: 'format-detection', content: 'telephone=no' }
  //   ],
  //   link: [
  //     { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  //   ]
  // },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/style/style.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  // plugins: [
  // ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    // '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/i18n',
  ],
  i18n: {
    locales: ['en', 'pt-br'],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',

      messages: {
        en: {
          "MISSING_NICKNAME_REGION": "You must provide an nickname and a region",
          "INEXISTENT_NICKNAME": "This nickname does not exist",
          "EXPIRED_API_KEY": "Api key expired",
          "UNAUTHENTICATED": "You are unauthenticated to acess this resource",
          "SUMMONER_NOT_FOUND": "Summoner not found, please, acess the website and place you league of legends summoner name",
          "SUMMONER_NICKNAME_SAVED": "Nickname saved with sucess, try activate the skill now!",
          "TITLE": "Show your league of legends elo skill for Amazon Alexa",
          "AMAZON_LOGIN": "Login with amazon",
          "UNHANDLED_ERROR_MESSAGE": "Oops, looks like ziggs passed through here!",
          "ERROR_OCCURRED": "An error has occurred",
          "SUMMONER_FIELD_PLACEHOLDER": "Type our summoner name...",
          "REGION": "Region",
          "SAVE": "Save",
          "SAVE_SUCCESS_REDIRECT": "Nickname saved with sucess, you will be redirected back to app in",
        },
        pt: {
          "MISSING_NICKNAME_REGION": "Você deve selecionar uma região e um nome do invocador",
          "INEXISTENT_NICKNAME": "Este nickname não existe",
          "EXPIRED_API_KEY": "Chave de api expirada",
          "UNAUTHENTICATED": "Você não está autenticado",
          "SUMMONER_NOT_FOUND": "Nick do invocador não encontrado, por favor, acesse o site da skill e insira lá",
          "SUMMONER_NICKNAME_SAVED": "Nome do invocador salvo com sucesso, tente invocar a skill agora!",
          "TITLE": "Exibir elo do league of legends skill para Amazon Alexa",
          "AMAZON_LOGIN": "Logar com amazon",
          "UNHANDLED_ERROR_MESSAGE": "Ops, parece que o ziggs passou por aqui!",
          "ERROR_OCCURRED": "Ocorreu um erro",
          "SUMMONER_FIELD_PLACEHOLDER": "Digite seu nome do invocador..",
          "REGION": "Região",
          "SAVE": "Salvar",
          "SAVE_SUCCESS_REDIRECT": "Nome do invocador salvo com sucesso, Você será redirecionado de volta para o app em",
        },
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
