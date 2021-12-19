import * as dotenv from 'dotenv';

dotenv.config();

export class Config {
  static getNaverClientID() {
    return process.env.NAVER_CLIENT_ID;
  }

  static getNaverClientSecret() {
    return process.env.NAVER_CLIENT_SECRET;
  }

  static getTwitchClientId(): string {
    return process.env.TWITCH_CLIENT_ID || '';
  }

  static getTwitchClientSecret() {
    return process.env.TWITCH_SECRET_KEY || '';
  }
}
