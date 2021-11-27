import * as dotenv from 'dotenv';

dotenv.config();

export class Config {
  static getNaverClientID() {
    return process.env.NAVER_CLIENT_ID;
  }

  static getNaverClientSecret() {
    return process.env.NAVER_CLIENT_SECRET;
  }
}
