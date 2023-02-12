import { defineEventHandler, readBody } from "h3";
import Utils from "./functions/utils";
import jwt from "jsonwebtoken";
import consts from "./functions/constants";

export default defineEventHandler(async (request) => {

  
  if (request.node.req.method === 'POST') {
    const query = await readBody(request);
    console.log(query);
    const code = query["code"] as string;
    if(code && code.length == 20) {
      try {
        const acessToken = await Utils.changeCodeToAcessToken(code, consts.allConsts.alexaRedirectUri);
        console.log("Acess token adquirido 2!");
        console.log(acessToken);
        if(!acessToken) {
          return {message: "Não foi possivel trocar o código por token de acesso"};
        }
        const userId = await Utils.getUserId(acessToken);
        console.log("User id:  " + userId);
        const jwtToken = jwt.sign({ userId: userId }, consts.allConsts.jwtKey)
        console.log("JWT:  " + jwtToken);
        return {
          jwt: jwtToken
        }
      } catch (e) {
        console.error(e);
        return {message: "Código recebido foi delcarado como inválido pela amazon"};
      }
    } else {
      return {message: "Token de autenticação inválido ou não foi recebido"};
    }



  }
});