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
  port: process.env.PORT || 8080,
  riotApiKey: process.env.RIOT_API_KEY,
  jwtKey: "shhh",
  ...publicConsts,
}
export default {
  publicConsts, 
  allConsts
}