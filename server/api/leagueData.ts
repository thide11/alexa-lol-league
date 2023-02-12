import getJwtAmazonIdOrNull from "./functions/getJwtAmazonIdOrNull"
import { defineEventHandler, getQuery, readBody } from 'h3';
import Database from "./database";
import Utils from "./functions/utils";
import RiotApi from "./riot-api";

export default defineEventHandler(async (request) => {

  const database = new Database();
  const riotApi = new RiotApi();

  if (request.node.req.method === 'POST') {

    const query = getQuery(request)
    const jwt = query.jwt as string;

    const amazonId = getJwtAmazonIdOrNull(jwt)

    const userData = await readBody(request);

    if (!userData.nickname || !userData.region) {
      return {
        code: "MISSING_NICKNAME_REGION",
        message: "You must provide an nickname and a region"
      }
    }
    try {

      const riotData = await riotApi.getSummonerData(userData.region, userData.nickname);
      if (riotData == null) {
        return {
          code: "INEXISTENT_NICKNAME",
          message: "This nickname does not exist"
        }
      }

      const newData = {
        nickname: userData.nickname,
        region: userData.region,
        puuid: riotData.puuid,
        summonerId: riotData.id,
      }
      console.log(userData)
      await database.saveUserDataByAmazonId(amazonId, newData);
      return newData;
    } catch (e) {
      //@ts-ignore
      if (e?.response?.status == 403) {
        return Utils.sendExpiredApiKey(request)
      }
    }

  } else {
    console.log("Recebido GET")
    const query = getQuery(request);
    console.log(query)
    const amazonId = getJwtAmazonIdOrNull(query["jwt"] as string);
    console.log("Amaazon id:")
    console.log(amazonId)
    try {
      console.log("Carregando elo do usuario...")
      const data = (await database.getUserDataByAmazonId(amazonId)) ?? {
        nickname: '',
        region: '',
      };
      console.log("Elo carregado!...")
      console.log(data)
      return data;
    } catch (e : any) {
      if (e?.response?.status == 403) {
        return Utils.sendExpiredApiKey(request)
      }
      console.error(e);
      request.node.res.statusCode = 400;
      return {
        message: e?.message
      }
    }
  }

  console.log("Nenhum response, deu ruim!")

  return {
    foi: true
  }
})