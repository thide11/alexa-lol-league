const axios = require("axios")
const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken');

const isDev = process.env.NODE_ENV !== 'production'
const { loadNuxt, build } = require('nuxt')

module.exports = async (publicConsts, allConsts, database, riotApi) => {
  const app = express()
  const jwtKey = "shhh"

  app.use(express.json())
  app.use(cors())

  app.get('/constants', (_, res) => {
    res.send(publicConsts);
  })

  function getJwtAmazonIdOrNull(req) {
    try {
      if (!req.query.jwt) {
        return null;
      }
      const decoded = jwt.verify(req.query.jwt, jwtKey);
      console.log(decoded)
      return decoded.userId;
    } catch (e) {
      console.log(e)
      return null;
    }
  }

  app.get('/leagueData', async (req, res) => {
    const amazonId = getJwtAmazonIdOrNull(req)
    try {
      const data = (await database.getUserDataByAmazonId(amazonId)) ?? {
        nickname: '',
        region: '',
      };
      res.json(data);
    } catch (e) {
      if (e?.response?.status == 403) {
        sendExpiredApiKey(res)
        return;
      }
      console.error(e);
      return res.sendStatus(400);
    }
  })

  app.post('/leagueData', async (req, res) => {
    const amazonId = getJwtAmazonIdOrNull(req)

    const userData = req.body;
    if (!userData.nickname || !userData.region) {
      res.json({
        code: "MISSING_NICKNAME_REGION",
        message: "You must provide an nickname and a region"
      })
      return;
    }
    try {
      const riotData = await riotApi.getSummonerData(userData.region, userData.nickname);
      if (riotData == null) {
        res.json({
          code: "INEXISTENT_NICKNAME",
          message: "This nickname does not exist"
        })
        return;
      }



      const newData = {
        nickname: userData.nickname,
        region: userData.region,
        puuid: riotData.puuid,
        summonerId: riotData.id,
      }
      console.log(req.body)
      await database.saveUserDataByAmazonId(amazonId, newData);
      res.send(newData);
    } catch (e) {
      if (e?.response?.status == 403) {
        sendExpiredApiKey(res)
      }
    }
  })

  function sendExpiredApiKey(res) {
    res.status(403).send({
      code: "EXPIRED_API_KEY",
      message: "Api key expired"
    })
  }

  app.post('/exchangeCodeToJWT', async (req, res) => {
    const { code, } = req.body;
    if(code && code.length == 20) {
      try {
        const acessToken = await changeCodeToAcessToken(code, allConsts.alexaRedirectUri);
        console.log("Acess token adquirido 2!");
        console.log(acessToken);
        if(!acessToken) {
          res.json({message: "Não foi possivel o trocar o código por token de acesso"});
          return;
        }
        const userId = await getUserId(acessToken);
        console.log("User id:  " + userId);
        const jwtToken = jwt.sign({ userId: userId }, jwtKey)
        console.log("JWT:  " + jwtToken);
        res.status(200).json({
          jwt: jwtToken
        })
      } catch (e) {
        console.error(e);
        res.json({message: "Código recebido foi delcarado como inválido pela amazon"});
      }
    } else {
      res.json({message: "Token de autenticação inválido não recebido"});
    }
  });

  app.get('/getElo', async (req, res) => {
    const amazonId = getJwtAmazonIdOrNull(req);
    if (amazonId == null) {
      res.json({
        code: "UNAUTHENTICATED",
        message: "You are unauthenticated to acess this resource"
      })
      return;
    }

    const data = await database.getUserDataByAmazonId(amazonId);
    console.log(data);
    if (!data) {
      res.json({
        code: "SUMMONER_NOT_FOUND",
        message: "Summoner not found, please, acess the website and place you league of legends summoner name"
      })
      return;
    }
    const rankData = await riotApi.getSoloDuoRank(data.region, data.summonerId)
    console.log(rankData)
    res.json(rankData)
  })

  const nuxt = await loadNuxt(isDev ? 'dev' : 'start')
  app.use(nuxt.render)
  if (isDev) {
    build(nuxt)
  }

  async function changeCodeToAcessToken(code, redirectUri) {
    const payload = new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      client_id: allConsts.clientId,
      client_secret: allConsts.clientSecret,
      redirect_uri: redirectUri,
    })
    console.log(payload);
    try {
      const data = await axios.post(
        "https://api.amazon.com/auth/o2/token",
        payload,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      
      console.log(data.data);
      console.log("Acess token adquirido!");
      return data.data.access_token;
    } catch (e) {
      console.log(e.response.data)
    }
  }

  async function getUserId(accessToken) {
    const response = await axios.get(`https://api.amazon.com/user/profile?access_token=${accessToken}`)
    const { user_id } = response.data;
    return user_id;
  }

  return app;
}