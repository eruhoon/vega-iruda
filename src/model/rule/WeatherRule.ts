import { GeneralPurposeCardBody } from '../../framework/response/body/GeneralPurposeCardBody';
import { GeneralPurposeCardResponse } from '../../framework/response/GeneralPurposeCardResponse';
import { Response } from '../../framework/response/Response';
import { TextResponse } from '../../framework/response/TextReponse';
import { ExpiredCacheLoader } from '../loader/ExpiredCacheLoader';
import { Loader } from '../loader/Loader';
import { WeatherLoader } from '../loader/weather/WeatherLoader';
import { ArgumentRuleTemplate } from './ArgumentRuleTemplate';

export class WeatherRule extends ArgumentRuleTemplate {
  private readonly URL =
    'https://www.weather.go.kr/weather/main-now-weather.jsp';
  private loader: Loader<Weather[]>;

  public constructor() {
    super('날씨');
    this.loader = new ExpiredCacheLoader(new WeatherLoader(), 60 * 60 * 1000);
  }

  protected async makeMessageWithArg(arg: string): Promise<Response> {
    const city = arg;
    const weathers = await this.loader.load();
    const weather = weathers.find((w) => w.name === city);
    if (!weather) {
      return new TextResponse('검색 실패');
    }
    return new GeneralPurposeCardResponse({
      link: this.URL,
      title: `${city} 날씨`,
      icon: weather.img,
      subtitle: `${weather.weather} ${weather.temp}℃`,
    });
  }
}

type Weather = {
  name: string;
  weather: string;
  temp: number;
  img: string;
};
