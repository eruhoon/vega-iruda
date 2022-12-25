import { GeneralPurposeCardResponse } from '../../framework/response/GeneralPurposeCardResponse';
import { Response } from '../../framework/response/Response';
import { TextResponse } from '../../framework/response/TextReponse';
import { ExpiredCacheLoader } from '../loader/ExpiredCacheLoader';
import { Loader } from '../loader/Loader';
import { CityWeatherLoader } from '../loader/weather/CityWeatherLoader';
import { ArgumentRuleTemplate } from './ArgumentRuleTemplate';

export class CityWeatherRule extends ArgumentRuleTemplate {
  readonly #URL = 'https://www.weather.go.kr/';
  #loader: Loader<Weather>;

  constructor() {
    super('웨더');
    this.#loader = new CityWeatherLoader();
  }

  protected async makeMessageWithArg(arg: string): Promise<Response> {
    const city = arg;
    const weather = await this.#loader.load(city);
    const FAILTEMP = -9999;
    
    if (!weather || weather.temp === FAILTEMP || weather.temp2 === FAILTEMP ) {
      return new TextResponse('검색 실패');
    }
    return new GeneralPurposeCardResponse({
      link: this.#URL,
      title: `${city} (${weather.weather})`,
      icon: weather.img,
      subtitle: `${weather.temp}℃(${weather.temp2}℃)`,
    });
  }
}

type Weather = {
  name?: string;
  weather: string;
  temp: number;
  temp2: number;
  img: string;
};
