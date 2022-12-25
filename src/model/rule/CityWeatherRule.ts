import { GeneralPurposeCardBodyOption } from '../../framework/response/body/GeneralPurposeCardBody';
import { GeneralPurposeCardResponse } from '../../framework/response/GeneralPurposeCardResponse';
import { GeneralPurposeCarouselResponse } from '../../framework/response/GeneralPurposeCarouselResponse';
import { Response } from '../../framework/response/Response';
import { TextResponse } from '../../framework/response/TextReponse';
import { CityWeatherLoader } from '../loader/weather/CityWeatherLoader';
import { ArgumentRuleTemplate } from './ArgumentRuleTemplate';

export class CityWeatherRule extends ArgumentRuleTemplate {
  readonly #URL = 'https://www.weather.go.kr/';
  #loader: CityWeatherLoader;

  constructor() {
    super('웨더');
    this.#loader = new CityWeatherLoader();
  }

  protected async makeMessageWithArg(arg: string): Promise<Response> {
    const city = arg;
    const weathers = await this.#loader.load(city);
    const FAILTEMP = -9999;
    if (!Array.isArray(weathers)) {
      return new TextResponse('검색 실패');
    }
    if(weathers.length === 1) {
      const weather = weathers[0];
      if (weather.temp === FAILTEMP || weather.temp2 === FAILTEMP ) {
        return new TextResponse('검색 실패');
      }
      return new GeneralPurposeCardResponse({
        link: this.#URL,
        title: `${city} (${weather.weather})`,
        icon: weather.img,
        subtitle: `${weather.temp}℃(${weather.temp2}℃)`,
      });
    } else {
      const options = weathers.map<GeneralPurposeCardBodyOption>((weather) => {
        return {
          link: this.#URL,
          title: `${weather.name} (${weather.weather})`,
          icon: weather.img,
          subtitle: `${weather.temp}℃(${weather.temp2}℃)`,
        };
      });
      return new GeneralPurposeCarouselResponse(options);
    }
  }
}

type Weather = {
  name?: string;
  weather: string;
  temp: number;
  temp2: number;
  img: string;
};
