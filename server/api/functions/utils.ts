import axios from "axios";
import { H3Event } from "h3";
import constants from "./constants";

export default class Utils {
  static sendExpiredApiKey(request : H3Event) {
    request.node.res.statusCode = 403;
    return {
      code: "EXPIRED_API_KEY",
      message: "Api key expired"
    }
  }


  static async getUserId(accessToken : string) {
    const response = await axios.get(`https://api.amazon.com/user/profile?access_token=${accessToken}`)
    const { user_id } = response.data;
    return user_id;
  }

  static async changeCodeToAcessToken(code : string, redirectUri : string) {
    //@ts-ignore
    const payload = new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      client_id: constants.allConsts.clientId,
      client_secret: constants.allConsts.clientSecret,
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
      //@ts-ignore
      console.log(e.response.data)
    }
  }

}