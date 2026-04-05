import axios from "axios";
import constants from "./functions/constants";
import Logger from './functions/logger';

export default class RiotApi {
  constructor(private apiKey? : string) {
    if(apiKey == null) {
      this.apiKey = constants.allConsts.riotApiKey;
    }
  }

  /**
   * Maps platform region codes to the platform API host (used for League endpoints).
   */
  private getBaseUrl(region : string) {
    const regionsToHostBase : any = {
      "BR1": "br1", 
      "EUN1": "eun1",
      "EUW1": "euw1",
      "JP1": "jp1",
      "KR": "kr",
      "LA1": "la1",
      "LA2": "la2",
      "NA1": "na1",
      "OC1": "oc1",
      "TR1": "tr1",
      "RU": "ru",
    }
    const hostBase = regionsToHostBase[region]
    if(hostBase) {
      return `https://${hostBase}.api.riotgames.com`;
    } else {
      throw new Error(`Unknown region: ${region}`)
    }
  }

  /**
   * Maps platform region codes to the continental API host (used for Account endpoints).
   */
  getAccountBaseUrl(region : string) {
    const regionToContinental : Record<string, string> = {
      "BR1": "americas",
      "LA1": "americas",
      "LA2": "americas",
      "NA1": "americas",
      "OC1": "americas",
      "EUN1": "europe",
      "EUW1": "europe",
      "TR1": "europe",
      "RU": "europe",
      "JP1": "asia",
      "KR": "asia",
    }
    const continental = regionToContinental[region]
    if(continental) {
      return `https://${continental}.api.riotgames.com`;
    } else {
      throw new Error(`Unknown region: ${region}`)
    }
  }

  /**
   * Returns a default tagLine based on the platform region code.
   * Used when the user doesn't provide a tagLine in their Riot ID.
   */
  getDefaultTagLine(region : string) : string {
    const regionToTag : Record<string, string> = {
      "BR1": "br1",
      "EUN1": "eun1",
      "EUW1": "euw1",
      "JP1": "jp1",
      "KR": "kr",
      "LA1": "la1",
      "LA2": "la2",
      "NA1": "na1",
      "OC1": "oc1",
      "TR1": "tr1",
      "RU": "ru",
    }
    const tag = regionToTag[region]
    if(tag) {
      return tag;
    } else {
      throw new Error(`Unknown region for tagLine inference: ${region}`)
    }
  }

  /**
   * Parses a Riot ID string into gameName and tagLine.
   * Format: "gameName#tagLine" or just "gameName" (tagLine will be null).
   */
  parseRiotId(riotId : string) : { gameName: string, tagLine: string | null } {
    const hashIndex = riotId.indexOf('#');
    if(hashIndex === -1) {
      return { gameName: riotId.trim(), tagLine: null };
    }
    return {
      gameName: riotId.substring(0, hashIndex).trim(),
      tagLine: riotId.substring(hashIndex + 1).trim(),
    };
  }

  /**
   * Fetches account data using the new Riot Account v1 API.
   * Uses /riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}
   */
  async getAccountData(region : string, riotId : string) {
    try {
      const { gameName, tagLine: parsedTagLine } = this.parseRiotId(riotId);
      const tagLine = parsedTagLine || this.getDefaultTagLine(region);

      const url = `${this.getAccountBaseUrl(region)}/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}?api_key=${this.apiKey}`;
      Logger.log(url)
      const { data } = await axios.get(url)
      return data; // { puuid, gameName, tagLine }
    } catch (e) {
      //@ts-ignore
      if(e.response?.status == 404) {
        return null
      }
      throw e;
    }
  }

  async getLeagueEntries(region : string, puuid : string) {
    const url = `${this.getBaseUrl(region)}/lol/league/v4/entries/by-puuid/${puuid}?api_key=${this.apiKey}`;
    Logger.log(url)
    const { data } = await axios.get(url)
    return data;
  }

  async getSoloDuoRank(region : string, puuid : string) {
    const matchData = await this.getLeagueEntries(region, puuid);
    const rankedSolo = matchData.find((e : any) => e.queueType == "RANKED_SOLO_5x5");
    if(!rankedSolo) {
      return null;
    }
    return {
      tier: rankedSolo.tier,
      rank: rankedSolo.rank,
      leaguePoints: rankedSolo.leaguePoints
    }
  }
};