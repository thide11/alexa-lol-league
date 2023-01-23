import axios from "axios";

export default function (apiKey) {
  function getBaseUrl(region) {
    const regionsToHostBase = {
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

  async function getSummonerData(region, nickname) {
    try {
      const url = `${getBaseUrl(region)}/lol/summoner/v4/summoners/by-name/${encodeURI(nickname)}?api_key=${apiKey}`;
      console.log(url)
      const { data } = await axios.get(url)
      return data;
    } catch (e) {
      if(e.response.status == "404") {
        return null
      }
      throw e;
    }
  }

  async function getMatches(region, summonerId) {
    const url = `${getBaseUrl(region)}/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${apiKey}`;
    console.log(url)
    const { data } = await axios.get(url)
    return data;
  }

  async function getSoloDuoRank(region, summonerId) {
    const matchData = await getMatches(region, summonerId);
    const rankedSolo = matchData.find((e) => e.queueType == "RANKED_SOLO_5x5");
    if(!rankedSolo) {
      return null;
    }
    return {
      tier: rankedSolo.tier,
      rank: rankedSolo.rank,
      leaguePoints: rankedSolo.leaguePoints
    }
  }


  return {
    getSummonerData,
    getSoloDuoRank,
    getMatches,
  }
};