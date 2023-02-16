
import pkg from './package.json'

export default {
  target: "server",
  modules: [
    '@nuxtjs/i18n',
  ],
  typescript: {
    typeCheck: true
  },
  runtimeConfig: {
    public: {
      version: pkg.version,
    }
  },
  server: {
    // https: {
    //   key: fs.readFileSync(fileURLToPath(new URL('./server.key', import.meta.url))),
    //   cert: fs.readFileSync(fileURLToPath(new URL('./server.crt', import.meta.url)))
    // }
  },
  css: [
    '@/assets/style/style.css'
  ],
  i18n: {
    locales: ['en', 'pt-br'],
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',  // recommended
      alwaysRedirect: true
    },
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: {
          "MISSING_NICKNAME_REGION": "You must provide an nickname and a region",
          "INEXISTENT_NICKNAME": "This nickname does not exist",
          "EXPIRED_API_KEY": "Api key expired",
          "UNAUTHENTICATED": "You are unauthenticated to acess this resource",
          "SUMMONER_NOT_FOUND": "Summoner not found, please, acess the website and place you League of Legends summoner name",
          "SUMMONER_NICKNAME_SAVED": "Nickname saved with sucess, try activate the skill now!",
          "TITLE": "Show your League of Legends elo - skill for Amazon Alexa",
          "AMAZON_LOGIN": "Login with amazon",
          "UNHANDLED_ERROR_MESSAGE": "Oops, looks like ziggs passed through here!",
          "ERROR_OCCURRED": "An error has occurred",
          "SUMMONER_FIELD_PLACEHOLDER": "Type our summoner name...",
          "REGION": "Region",
          "SAVE": "Save",
          "SAVE_AND_REDIRECT": "Save and redirect to alexa",
          "SAVE_SUCCESS_REDIRECT": "Nickname saved with sucess, you will be redirected back to app in",
          "LOGOUT": "Logout",
          "VINCULATION_TUTORIAL_TITLE": "Welcome to the linking step, you will do the following steps:",
          "VINCULATION_TUTORIAL_STEP_1": "Authenticate with an amazon account",
          "VINCULATION_TUTORIAL_STEP_2": "If you are a new user, enter your nickname and region of lol",
          "VINCULATION_TUTORIAL_STEP_3": 'Activate the skill by saying "Alexa, open league legends rank"',
          "VINCULATION_TUTORIAL_END": "You can enter any nickname, including famous ones, and change it at any time by accessing the website leagueskill.com"
        },
        pt: {
          "MISSING_NICKNAME_REGION": "Você deve selecionar uma região e um nome do invocador",
          "INEXISTENT_NICKNAME": "Este nickname não existe",
          "EXPIRED_API_KEY": "Chave de api expirada",
          "UNAUTHENTICATED": "Você não está autenticado",
          "SUMMONER_NOT_FOUND": "Nick do invocador não encontrado, por favor, acesse o site da skill e insira lá",
          "SUMMONER_NICKNAME_SAVED": "Nome do invocador salvo com sucesso, tente invocar a skill agora!",
          "TITLE": "Veja seu elo do League of Legends - skill para Amazon Alexa",
          "AMAZON_LOGIN": "Logar com amazon",
          "UNHANDLED_ERROR_MESSAGE": "Ops, parece que o ziggs passou por aqui!",
          "ERROR_OCCURRED": "Ocorreu um erro",
          "SUMMONER_FIELD_PLACEHOLDER": "Digite seu nome do invocador..",
          "REGION": "Região",
          "SAVE": "Salvar",
          "SAVE_AND_REDIRECT": "Salvar e redirecionar para a alexa",
          "SAVE_SUCCESS_REDIRECT": "Nome do invocador salvo com sucesso, Você será redirecionado de volta para o app em",
          "LOGOUT": "Deslogar",
          "VINCULATION_TUTORIAL_TITLE": "Bem vindo a etapa de vinculação, você irá fazer as seguintes etapas:",
          "VINCULATION_TUTORIAL_STEP_1": "Autentique com uma conta da amazon",
          "VINCULATION_TUTORIAL_STEP_2": "Se for usuário novo, informe seu nickname e região do lol",
          "VINCULATION_TUTORIAL_STEP_3": 'Ative a skill falando "Alexa, abrir meu elo no lol"',
          "VINCULATION_TUTORIAL_END": "Você pode inserir qualquer nickname, inclusive de famosos, e alterar a qualquer momento acessando o site leagueskill.com"
        },
      }
    }
  },
  serverMiddleware: [
    { path: "/apis", handler: "~/index.js" },
    { path: '/server-middleware', handler: '~/server-middleware/index.js' },
  ],
}