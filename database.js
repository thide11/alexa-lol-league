module.exports = function() {
  let data = {
    // Only for example
    "amzn1.account.AHL76SLYJDIHFDIMUWGW4HKMR5PA": {
      nickname: 'thide11',
      region: 'BR1',
      puuid: 'ax6ygoaRZb5619WRRc1F2wen3LcJBzcQ5r9HWdo3MpBMrLyKpWV-d-JZQJeRh_YR0TE_Zq6Mmq4KAg',
      summonerId: 'UC5L2_SLSKb26U81dPU3mADwfN6yjl_AKJD1wgKwKpLWdMw'
    }
  }

  async function getUserDataByAmazonId(id) {
    return data[id]
  }

  async function saveUserDataByAmazonId(id, newData) {
    console.log(newData);
    data[id] = newData;
  }

  return {
    getUserDataByAmazonId,
    saveUserDataByAmazonId,
  }
}()