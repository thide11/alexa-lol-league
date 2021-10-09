const axios = require("axios")
const express = require('express')
const jwt = require('jsonwebtoken');
const database = require("./src/database");
const bodyParser = require("body-parser");
const riotApiFn = require("./src/riot-api");
const dotenv = require("dotenv");
const createServer = require("./src/server");
dotenv.config();

const baseUrl = process.env.BASE_URL;
const publicConsts = {
  clientId: process.env.AMAZON_CLIENT_ID,
  baseUrl: baseUrl,
  redirectUri: baseUrl + "/ouathcallback",
  alexaRedirectUri: baseUrl + "/alexaouathcallback",
}

const allConsts = {
  clientSecret: process.env.AMAZON_CLIENT_SECRET,
  port: process.env.PORT,
  riotApiKey: process.env.RIOT_API_KEY,
  ...publicConsts,
}

const riotApi = riotApiFn(allConsts.riotApiKey)
const app = createServer(publicConsts, allConsts, database, riotApi);

app.listen(allConsts.port, () => {
  console.log(`Listening at https://localhost:${allConsts.port}`)
})