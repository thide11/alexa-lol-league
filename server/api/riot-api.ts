import axios from "axios";
import constants from "./functions/constants";

export default class RiotApi {
  constructor(private apiKey? : string) {
    if(apiKey == null) {
      this.apiKey = constants.allConsts.riotApiKey;
    }
  }

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
      throw new Error(`Unknow region: ${region}`)
    }
  }

  async getSummonerData(region : string, nickname : string) {
    try {
      const url = `${this.getBaseUrl(region)}/lol/summoner/v4/summoners/by-name/${encodeURI(nickname)}?api_key=${this.apiKey}`;
      console.log(url)
      const { data } = await axios.get(url)
      return data;
    } catch (e) {
      //@ts-ignore
      if(e.response.status == "404") {
        return null
      }
      throw e;
    }
  }

  async getMatches(region : string, summonerId : string) {
    const url = `${this.getBaseUrl(region)}/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${this.apiKey}`;
    console.log(url)
    const { data } = await axios.get(url)
    return data;
  }

  async getSoloDuoRank(region : string, summonerId : string) {
    const matchData = await this.getMatches(region, summonerId);
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