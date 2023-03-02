import jwt from "jsonwebtoken";
import constants from "./constants";
import Logger from './logger';

export default function getJwtAmazonIdOrNull(userJwt? : string) {
  try {
    if (!userJwt) {
      return null;
    }
    const decoded = jwt.verify(userJwt, constants.allConsts.jwtKey) as jwt.JwtPayload;
    Logger.log(decoded)
    return decoded.userId;
  } catch (e) {
    Logger.log(e)
    return null;
  }
}