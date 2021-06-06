import axios from 'axios';
import Cheerio from 'cheerio';
import * as iconv from 'iconv-lite';
import { GeneralPurposeCardBody } from '../../framework/response/body/GeneralPurposeCardBody';
import { GeneralPurposeCardResponse } from '../../framework/response/GeneralPurposeCardResponse';
import { Response } from '../../framework/response/Response';
import { TextResponse } from '../../framework/response/TextReponse';
import { ArgumentRuleTemplate } from './ArgumentRuleTemplate';

export class WeatherRule extends ArgumentRuleTemplate {
  private readonly URL =
    'https://www.weather.go.kr/weather/main-now-weather.jsp';
  private weathersCache: Weather[] | null = null;
  private expires: number = 0;

  public constructor() {
    super('날씨');
  }

  protected async makeMessageWithArg(arg: string): Promise<Response> {
    const city = arg;
    const weathers = await this.getWeathers();
    const weather = weathers.find((w) => w.name === city);
    if (!weather) {
      return new TextResponse('검색 실패');
    }
    return new GeneralPurposeCardResponse(
      new GeneralPurposeCardBody(
        this.URL,
        `${city} 날씨`,
        weather.img,
        `${weather.weather} ${weather.temp}℃`,
        false
      )
    );
  }

  private async getWeathers(): Promise<Weather[]> {
    const timestamp = new Date().getTime();
    if (this.weathersCache === null || timestamp >= this.expires) {
      this.weathersCache = await this.getWeatherFromWeb();
      this.expires = timestamp + 60 * 60 * 1000;
    }
    return this.weathersCache;
  }

  private async getWeatherFromWeb(): Promise<Weather[]> {
    const { data: rawBody } = await axios.get(this.URL, {
      responseType: 'arraybuffer',
    });
    const data = iconv.decode(Buffer.from(rawBody), 'EUC-KR').toString();

    if (!data) {
      return [];
    }
    const $ = Cheerio.load(data, {
      normalizeWhitespace: true,
    });
    const $weathers = $('#weather dl');
    const weathers: Weather[] = $weathers.toArray().map((e) => {
      const $e = $(e);
      const name = $e.find('dt').eq(0).text();
      const weatherAlt = $e.find('dd.weather').attr('alt');
      const weather = weatherAlt ? weatherAlt.toString() : '';
      const imgSrc = $e.find('img').attr('src');
      const imgPath = imgSrc ? imgSrc.toString() : '';
      const img = `https://www.weather.go.kr${imgPath}`;
      const temp = parseFloat($e.find('dd.temp').text());
      return { name, weather, temp, img };
    });
    return weathers;
  }
}

type Weather = {
  name: string;
  weather: string;
  temp: number;
  img: string;
};
