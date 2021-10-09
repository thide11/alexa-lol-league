const request = require("supertest");
const app = require("../src/server");

describe("Should test server routes", () => {
  test("Should acess GET /leagueData", async () => {
    const fakeDatabase = jest.fn()
    fakeDatabase.getUserDataByAmazonId = 
      jest.fn()
      .mockImplementationOnce(() => ({
        nickname: "thide11",
        region: "BR",
      }))
    const publicConsts = {
      clientId: "http://teste.com.br",
      baseUrl: "http://teste.com.br",
    }
    
    const allConsts = {
      clientSecret: process.env.AMAZON_CLIENT_SECRET,
      port: process.env.PORT,
      riotApiKey: "RGAPI-782e00c2-4a89-411a-9ab2-d6a44f19206a",
      ...publicConsts,
    }
    const express = app(publicConsts, allConsts, fakeDatabase);

    const test = request(express)
    const response = await test.get("/leagueData");
    expect(fakeDatabase.getUserDataByAmazonId).toBeCalled();
    expect(response.body.nickname).toBe("thide11");
  })
})