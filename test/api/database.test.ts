import Database from "../../server/api/database";

export default async function load() {
  const db = new Database();
  const rest = await db.getUserDataByAmazonId("fwefwe")
  console.log(rest);
  return rest;
}
describe("Datases testes", () => {
  it("Should load an user elo", async () => {
    const db = new Database();
    console.log("Estou aqui!")
    await db.saveUserDataByAmazonId("fwefwe", {
      nickname: "thide11",
      puuid: "wegfewg",
      region: "BRL1",
      summonerId: "gregreg"
    });
    const rest = await db.getUserDataByAmazonId("fwefwe")
    console.log(rest);
    // return rest;
  }, 10000)
})