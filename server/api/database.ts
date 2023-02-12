

import postgress from 'pg';
const Client = postgress.Client;

interface Summoner {
  nickname : string,
  region: string,
  puuid : string,
  summonerId : string
}

export default class Database {

  public createConnection() {
    return new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: false,
    });
  }

  public async createTableIfNotExists() {
    const client = this.createConnection();
    await client.connect()
    const query = `CREATE TABLE IF NOT EXISTS summoners(
      nickname VARCHAR(16) NOT NULL,
      region VARCHAR(4) NOT NULL,
      puuid TEXT not NULL,
      summoner_id TEXT not null,
      amazon_id TEXT not null,
      PRIMARY KEY (amazon_id)
    );`
    await client.query(query);
    console.log("Tabela definida com sucesso");
    await client.end()
  }

  public async getUserDataByAmazonId(id : string) {
    const client = this.createConnection();
    await client.connect()
    const summoners = (await client.query(`select * from summoners WHERE amazon_id = '${id}'`)).rows;
    await client.end();
    if(summoners.length > 0) {
      const dbSummoner = summoners[0]
      return {
        nickname: dbSummoner.nickname,
        region: dbSummoner.region,
        puuid: dbSummoner.puuid,
        summonerId: dbSummoner["summoner_id"],
        amazonId: dbSummoner["amazon_id"]
      }
    }
    return null;
  }

  public async saveUserDataByAmazonId(id : string, newData : Summoner) {
    const client = this.createConnection();
    const summoner = await this.getUserDataByAmazonId(id);
    await client.connect()
    if(summoner == null) {
      await client.query(
        `insert into summoners (
          nickname,
          region,
          puuid,
          summoner_id,
          amazon_id
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
          summoner_id
        ) = (
          '${newData.nickname}',
          '${newData.region}',
          '${newData.puuid}',
          '${newData.summonerId}'
        ) WHERE amazon_id = '${id}'`
      );
    }
    await client.end();
  }
}
