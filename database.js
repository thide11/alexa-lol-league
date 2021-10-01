const postgres = require("postgres");

module.exports = function() {
  const sql = postgres(process.env.DATABASE_URL, {
    ssl: true,
  });
  // CREATE TABLE summoners(
  //   nickname VARCHAR(16) NOT NULL,
  //   region VARCHAR(4) NOT NULL,
  //   puuid TEXT not NULL,
  //   summonerId TEXT not null,
  //   amazonId TEXT not null,
  //   PRIMARY KEY (amazonId)
  // );

  async function getUserDataByAmazonId(id) {
    const summoners = await sql`select * from summoners WHERE amazonId = '${id}'`;
    return summoners.length > 0 ? summoners[0] : null;
  }

  async function saveUserDataByAmazonId(id, newData) {
    await sql`insert into summoners (
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
    )`;
  }

  return {
    getUserDataByAmazonId,
    saveUserDataByAmazonId,
  }
}()