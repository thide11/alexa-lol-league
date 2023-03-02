import getJwtAmazonIdOrNull from "./functions/getJwtAmazonIdOrNull"
import {defineEventHandler, getQuery} from "h3";
import database from "./database";
import riotApi from "./riot-api";
import Database from "./database";
import RiotApi from "./riot-api";
import Logger from './functions/logger';

export default defineEventHandler(async (request) => {
  const query = getQuery(request);
  const amazonId = getJwtAmazonIdOrNull(query["jwt"] as string);
  if (amazonId == null) {
    return {
      code: "UNAUTHENTICATED",
      message: "You are unauthenticated to access this resource"
    }
  }

  const database = new Database();
  const data = await database.getUserDataByAmazonId(amazonId);
  Logger.log(data);
  if (!data) {
    return {
      code: "SUMMONER_NOT_FOUND",
      message: "Summoner not found, please, access the website and place you League of Legends summoner name"
    }
  }
  const riotApi = new RiotApi();
  const rankData = await riotApi.getSoloDuoRank(data.region, data.summonerId)
  Logger.log(rankData)
  return rankData ?? {}
})