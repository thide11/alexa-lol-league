import jwt from "jsonwebtoken";
import constants from "./constants";

export default function getJwtAmazonIdOrNull(userJwt? : string) {
  try {
    if (!userJwt) {
      return null;
    }
    const decoded = jwt.verify(userJwt, constants.allConsts.jwtKey) as jwt.JwtPayload;
    console.log(decoded)
    return decoded.userId;
  } catch (e) {
    console.log(e)
    return null;
  }
}