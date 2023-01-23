import database from "./src/database.js"
import riotApiFn from "./src/riot-api.js"
import createServer from "./src/server.js"
import dotenv from "dotenv"
dotenv.config();

const baseUrl = process.env.BASE_URL ?? "http://leagueskill.com";
// console.log(baseUrl);
const publicConsts = {
  clientId: process.env.AMAZON_CLIENT_ID,
  baseUrl: baseUrl,
  redirectUri: baseUrl + "/",
  alexaRedirectUri: baseUrl + "/",
}

const allConsts = {
  clientSecret: process.env.AMAZON_CLIENT_SECRET,
  port: process.env.PORT || 80,
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
