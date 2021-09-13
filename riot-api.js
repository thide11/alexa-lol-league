const axios = require("axios")

module.exports = function (apiKey) {
  const baseUrl = "https://br1.api.riotgames.com";
  
  function getBaseUrl(region) {
    return `https://${region}.api.riotgames.com`;
  }

  async function getSummonerData(nickname) {
    try {
      const { data } = await axios.get(`${baseUrl}/lol/summoner/v4/summoners/by-name/${nickname}?api_key=${apiKey}`)
      return data;
    } catch (e) {
      if(e.response.status == "404") {
        return null
      }
      throw e;
    }
  }

  async function getMatches(accountId) {
    const { data } = await axios.get(`${baseUrl}/lol/league/v4/entries/by-summoner/${accountId}?api_key=${apiKey}`)
    return data;
  }

  async function getSoloDuoRank(accountId) {
    const matchData = await getMatches(summonerId);
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