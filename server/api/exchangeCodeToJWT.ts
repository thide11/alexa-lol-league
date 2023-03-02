import { defineEventHandler, readBody } from "h3";
import Utils from "./functions/utils";
import jwt from "jsonwebtoken";
import consts from "./functions/constants";
import Logger from './functions/logger';

export default defineEventHandler(async (request) => {

  
  if (request.node.req.method === 'POST') {
    const query = await readBody(request);
    Logger.log(query);
    const code = query["code"] as string;
    if(code && code.length == 20) {
      try {
        let redirectUrl = request.node.req.headers.referer!;
        
        if(redirectUrl.includes("?code=")) {
          redirectUrl = redirectUrl.split("?code=")[0]
        }
        if(redirectUrl.includes("&code=")) {
          redirectUrl = redirectUrl.split("&code=")[0]
        }
        Logger.log("Redirect url gerado:")
        Logger.log(redirectUrl)

        const acessToken = await Utils.changeCodeToAcessToken(code, redirectUrl);
        Logger.log("Acess token adquirido 2!");
        Logger.log(acessToken);
        if(!acessToken) {
          return {message: "Não foi possivel trocar o código por token de acesso"};
        }
        const userId = await Utils.getUserId(acessToken);
        Logger.log("User id:  " + userId);
        const jwtToken = jwt.sign({ userId: userId }, consts.allConsts.jwtKey)
        Logger.log("JWT:  " + jwtToken);
        return {
          jwt: jwtToken
        }
      } catch (e) {
        console.error(e);
        return {message: "Código recebido foi declarado como inválido pela amazon"};
      }
    } else {
      return {message: "Token de autenticação inválido ou não foi recebido"};
    }



  }
});