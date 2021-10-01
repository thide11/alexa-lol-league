const { Client } = require("pg");

module.exports = function() {

  function createConnection() {
    return new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });
  }
  // CREATE TABLE summoners(
  //   nickname VARCHAR(16) NOT NULL,
  //   region VARCHAR(4) NOT NULL,
  //   puuid TEXT not NULL,
  //   summonerId TEXT not null,
  //   amazonId TEXT not null,
  //   PRIMARY KEY (amazonId)
  // );

  async function getUserDataByAmazonId(id) {
    const client = createConnection();
    await client.connect()
    const summoners = await client.query(`select * from summoners WHERE amazonId = '${id}'`).rows;
    await client.end();
    return summoners.length > 0 ? summoners[0] : null;
  }

  async function saveUserDataByAmazonId(id, newData) {
    const client = createConnection();
    const summoner = await getUserDataByAmazonId(id);
    await client.connect()
    if(summoner != null) {
      await client.query(
        `insert into summoners (
          nickname,
          region,
          puuid,
          summonerId,
          amazonId
        ) values (
          '${newData.nickname}',
          '${newData.region}',
          '${newData.puuid}',
          '${newData.summonerId}',
          '${id}'
        )`
      );
    } else {
      await client.query(
        `update summoners set (
          nickname,
          region,
          puuid,
          summonerId
        ) = (
          '${newData.nickname}',
          '${newData.region}',
          '${newData.puuid}',
          '${newData.summonerId}'
        ) WHERE amazonId = '${id}'`
      );
    }
    await client.end();
  }

  return {
    getUserDataByAmazonId,
    saveUserDataByAmazonId,
  }
}()