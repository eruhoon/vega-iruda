import { GeneralPurposeCardBody } from '../../framework/response/body/GeneralPurposeCardBody';
import { GeneralPurposeCardResponse } from '../../framework/response/GeneralPurposeCardResponse';
import { Response } from '../../framework/response/Response';
import { TextResponse } from '../../framework/response/TextReponse';
import { WeatherLoader } from '../loader/weather/WeatherLoader';
import { ArgumentRuleTemplate } from './ArgumentRuleTemplate';

export class WeatherRule extends ArgumentRuleTemplate {
  private readonly URL =
    'https://www.weather.go.kr/weather/main-now-weather.jsp';
  private weathersCache: Weather[] | null = null;
  private expires: number = 0;
  private loader: WeatherLoader;

  public constructor() {
    super('날씨');
    this.loader = new WeatherLoader();
  }

  protected async makeMessageWithArg(arg: string): Promise<Response> {
    const city = arg;
    const weathers = await this.getWeathers();
    const weather = weathers.find((w) => w.name === city);
    if (!weather) {
      return new TextResponse('검색 실패');
    }
    return new GeneralPurposeCardResponse(
      new GeneralPurposeCardBody({
        link: this.URL,
        title: `${city} 날씨`,
        icon: weather.img,
        subtitle: `${weather.weather} ${weather.temp}℃`,
      })
    );
  }

  private async getWeathers(): Promise<Weather[]> {
    const timestamp = new Date().getTime();
    if (this.weathersCache === null || timestamp >= this.expires) {
      this.weathersCache = await this.loader.load();
      this.expires = timestamp + 60 * 60 * 1000;
    }
    return this.weathersCache;
  }
}

type Weather = {
  name: string;
  weather: string;
  temp: number;
  img: string;
};
