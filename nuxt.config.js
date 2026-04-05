
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
          "MISSING_NICKNAME_REGION": "You must provide an Riot ID and a region",
          "INEXISTENT_NICKNAME": "This Riot ID does not exist",
          "EXPIRED_API_KEY": "Api key expired",
          "UNAUTHENTICATED": "You are unauthenticated to acess this resource",
          "SUMMONER_NOT_FOUND": "Summoner not found, please, acess the website and place you League of Legends Riot ID",
          "SUMMONER_NICKNAME_SAVED": "Riot ID saved with sucess, try activate the skill now!",
          "TITLE": "Show your League of Legends elo - skill for Amazon Alexa",
          "AMAZON_LOGIN": "Login with amazon",
          "UNHANDLED_ERROR_MESSAGE": "Oops, looks like ziggs passed through here!",
          "ERROR_OCCURRED": "An error has occurred",
          "SUMMONER_FIELD_PLACEHOLDER": "Type our Riot ID...",
          "RIOT_ID_PLACEHOLDER": "Player#BR1",
          "REGION": "Region",
          "SAVE": "Save",
          "SAVE_AND_REDIRECT": "Save and redirect to alexa",
          "SAVE_SUCCESS_REDIRECT": "Riot ID saved with sucess, you will be redirected back to app in",
          "LOGOUT": "Logout",
          "VINCULATION_TUTORIAL_TITLE": "Welcome to the linking step, you will do the following steps:",
          "VINCULATION_TUTORIAL_STEP_1": "Authenticate with an amazon account",
          "VINCULATION_TUTORIAL_STEP_2": "If you are a new user, enter your Riot ID and region of lol",
          "VINCULATION_TUTORIAL_STEP_3": 'Activate the skill by saying "Alexa, open league legends rank"',
          "VINCULATION_TUTORIAL_END": "You can enter any Riot ID, including famous ones, and change it at any time by accessing the website leagueskill.com"
        },
        pt: {
          "MISSING_NICKNAME_REGION": "Você deve selecionar uma região e digitar um Riot ID",
          "INEXISTENT_NICKNAME": "Este Riot ID não existe",
          "EXPIRED_API_KEY": "Chave de api expirada",
          "UNAUTHENTICATED": "Você não está autenticado",
          "SUMMONER_NOT_FOUND": "Nick do invocador não encontrado, por favor, acesse o site da skill e insira lá",
          "SUMMONER_NICKNAME_SAVED": "Riot ID salvo com sucesso, tente invocar a skill agora!",
          "TITLE": "Veja seu elo do League of Legends - skill para Amazon Alexa",
          "AMAZON_LOGIN": "Logar com amazon",
          "UNHANDLED_ERROR_MESSAGE": "Ops, parece que o ziggs passou por aqui!",
          "ERROR_OCCURRED": "Ocorreu um erro",
          "SUMMONER_FIELD_PLACEHOLDER": "Digite seu Riot ID..",
          "RIOT_ID_PLACEHOLDER": "Jogador#BR1",
          "REGION": "Região",
          "SAVE": "Salvar",
          "SAVE_AND_REDIRECT": "Salvar e redirecionar para a alexa",
          "SAVE_SUCCESS_REDIRECT": "Riot ID salvo com sucesso, Você será redirecionado de volta para o app em",
          "LOGOUT": "Deslogar",
          "VINCULATION_TUTORIAL_TITLE": "Bem vindo a etapa de vinculação, você irá fazer as seguintes etapas:",
          "VINCULATION_TUTORIAL_STEP_1": "Autentique com uma conta da amazon",
          "VINCULATION_TUTORIAL_STEP_2": "Se for usuário novo, informe seu Riot ID e região do lol",
          "VINCULATION_TUTORIAL_STEP_3": 'Ative a skill falando "Alexa, abrir meu elo no lol"',
          "VINCULATION_TUTORIAL_END": "Você pode inserir qualquer Riot ID, inclusive de famosos, e alterar a qualquer momento acessando o site leagueskill.com"
        },
      }
    }
  },
  serverMiddleware: [
    { path: "/apis", handler: "~/index.js" },
    { path: '/server-middleware', handler: '~/server-middleware/index.js' },
  ],
}