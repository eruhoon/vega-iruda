import axios from 'axios';
import Cheerio from 'cheerio';
import * as iconv from 'iconv-lite';
import { GeneralPurposeCardBody } from '../../framework/response/body/GeneralPurposeCardBody';
import { GeneralPurposeCardResponse } from '../../framework/response/GeneralPurposeCardResponse';
import { Response } from '../../framework/response/Response';
import { TextResponse } from '../../framework/response/TextReponse';
import { TextRule } from '../../framework/rule/TextRule';

export class WeatherRule extends TextRule {
  private readonly URL =
    'https://www.weather.go.kr/weather/main-now-weather.jsp';
  private weathersCache: Weather[] | null = null;
  private expires: number = 0;

  public match(src: string): boolean {
    return src.startsWith('!날씨 ');
  }

  public async makeMessage(src: string): Promise<Response> {
    const match = /!날씨 (.*)/.exec(src);
    const city = match ? match[1] : '';
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
      const $weathers = $e.find('dd.weather').attr('alt');
      const weather = $weathers ? $weathers.toString() : '';
      const imgPath = $e.find('img').attr('src')?.toString() || '';
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
