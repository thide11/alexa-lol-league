import fs from 'fs';

export default class Logger {
  static log(text : any) : void {
    console.log(text)
    fs.appendFileSync('logger.txt', new Date().toISOString() + ": " + text.toString() + "\n");
  }
}