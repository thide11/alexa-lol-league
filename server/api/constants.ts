import constants from "./functions/constants";
import { defineEventHandler } from 'h3';
export default defineEventHandler(() => {
  return constants.publicConsts;
})