const database = require("./src/database");
const riotApiFn = require("./src/riot-api");
const createServer = require("./src/server");
const dotenv = require("dotenv");
dotenv.config();

const baseUrl = process.env.BASE_URL;
console.log(baseUrl);
const publicConsts = {
  clientId: process.env.AMAZON_CLIENT_ID,
  baseUrl: baseUrl,
  redirectUri: baseUrl + "/",
  alexaRedirectUri: baseUrl + "/",
}

const allConsts = {
  clientSecret: process.env.AMAZON_CLIENT_SECRET,
  port: process.env.PORT || 5000,
  riotApiKey: process.env.RIOT_API_KEY,
  ...publicConsts,
}

async function startServer() {
  const riotApi = riotApiFn(allConsts.riotApiKey)
  const app = await createServer(publicConsts, allConsts, database, riotApi);
  
  app.listen(allConsts.port, () => {
    console.log(`Listening on port ${allConsts.port}`)
  })
}

startServer();
