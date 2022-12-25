import { GeneralPurposeCardBodyOption } from "../../framework/response/body/GeneralPurposeCardBody";
import { GeneralPurposeCardResponse } from "../../framework/response/GeneralPurposeCardResponse";
import { GeneralPurposeCarouselResponse } from "../../framework/response/GeneralPurposeCarouselResponse";
import { Response } from "../../framework/response/Response";
import { TextResponse } from "../../framework/response/TextReponse";
import { ArgumentLoader } from "../loader/ArgumentLoader";
import {
  CityWeatherLoader,
  FAIL_TEMPERATURE,
  WeatherLoaderResult,
} from "../loader/weather/CityWeatherLoader";
import { ArgumentRuleTemplate } from "./ArgumentRuleTemplate";

export class CityWeatherRule extends ArgumentRuleTemplate {
  readonly #URL = "https://www.weather.go.kr/";
  #loader: ArgumentLoader<string, WeatherLoaderResult[]> =
    new CityWeatherLoader();

  constructor() {
    super("웨더");
  }

  protected async makeMessageWithArg(arg: string): Promise<Response> {
    const city = arg;
    const weathers = await this.#loader.load(city);
    if (!Array.isArray(weathers)) {
      return new TextResponse("검색 실패");
    }
    if (weathers.length === 1) {
      const weather = weathers[0];
      if (
        weather.temp === FAIL_TEMPERATURE ||
        weather.temp2 === FAIL_TEMPERATURE
      ) {
        return new TextResponse("검색 실패");
      }
      return new GeneralPurposeCardResponse(this.makeCard(weather));
    } else {
      const options = weathers.map((weather) => this.makeCard(weather));
      return new GeneralPurposeCarouselResponse(options);
    }
  }

  makeCard(weather: WeatherLoaderResult): GeneralPurposeCardBodyOption {
    return {
      link: this.#URL,
      title: `${weather.name} (${weather.weather})`,
      icon: weather.img,
      subtitle: `${weather.temp}℃(${weather.temp2}℃)`,
    };
  }
}
