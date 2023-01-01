import axios from "axios";
import Cheerio from "cheerio";
import { ArgumentLoader } from "../ArgumentLoader";
import cityCodes from "./cityCodes.json";

export const FAIL_TEMPERATURE = -9999;
const FAIL_RESULT: WeatherLoaderResult = {
  name: "",
  weather: "",
  temp: FAIL_TEMPERATURE,
  temp2: FAIL_TEMPERATURE,
  img: "",
};

export class CityWeatherLoader
  implements ArgumentLoader<string, WeatherLoaderResult[]>
{
  getTempNumber(temp: string): number {
    const result = /(\-?\d+\.?[\d+])?℃/g.exec(temp);
    if (result !== undefined && result !== null) {
      return Number(result[1]);
    } else {
      return FAIL_TEMPERATURE;
    }
  }

  #getTemperature(body: string): { temperature: number; windChill: number } {
    const $ = Cheerio.load(body);
    const rawTemperature = $(".wrap-1 .tmp").text();
    const temperature = this.getTempNumber(rawTemperature);
    const rawWindChill = $(".wrap-1 .chill").text();
    const windChill = this.getTempNumber(rawWindChill);
    return { temperature, windChill };
  }

  #getName(
    cityName: string,
    cityCode: { code: number; city: string; detail?: string }
  ): string {
    return cityCode.detail ? cityCode.detail : cityName;
  }
  
  #getCompareDate(firstDate: Array<number>, secondDate: Array<number>) {
    return firstDate.every((date, index) => date === secondDate[index]);
  }

  #getSummary(body: string): { img: string; weather: string } {
    const $ = Cheerio.load(body, { normalizeWhitespace: true });

    const now = new Date();
    const compareNowDate = [now.getFullYear(), now.getMonth() + 1, now.getDate()];
    
    const $target = $("div.item-wrap ul.item")
      .filter((_, element) => {
        const $e = $(element);
        const parsedTime = $e.data("time");
        const parsedHour = parseInt(parsedTime.replace(/(\d{2}):\d+/, "$1"));
        const parsedDate: Array<number> = 
          $e.data("date").replace(/(\d{4})\-(\d{1,2})\-(\d{1,2})/, "$1,$2,$3")
            .split(",")
            .map((date:string) => parseInt(date));

        return (
          this.#getCompareDate(compareNowDate, parsedDate) &&
          now.getHours() <= parsedHour &&
          parsedHour <= now.getHours() + 1
        );
      });

    const $fisrtWeatherSpan = $target.find('span.wic');

    const weatherAlt = $fisrtWeatherSpan.text() || $fisrtWeatherSpan.attr("title");
    const weather = weatherAlt ? weatherAlt : "";

    const imgHost = "https://www.weather.go.kr/w/resources/icon/DY@64/A/Light/";
    const imgFileName = $fisrtWeatherSpan.attr("class")?.split(" ")[1];
    const img = imgFileName ? `${imgHost}/${imgFileName}.png` : "";

    return { img, weather };
  }

  async #reqeustGet(
    uri: string,
    query: string
  ): Promise<{ data: string; status: number }> {
    const accept =
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36";
    const agent =
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9";
    const host = "www.weather.go.kr";
    const dir = "w/wnuri-fct2021/main";

    const firstUrl = `https://${host}/${dir}/${uri}?${query}`;
    const { data: data, status } = await axios.get(firstUrl, {
      headers: { Accept: accept, "User-Agent": agent },
    });
    return { data: data as string, status };
  }

  async load(city: string): Promise<WeatherLoaderResult[]> {
    const resultCodes = cityCodes.filter((citycode) => citycode.city === city);

    if (resultCodes.length < 1) {
      return [FAIL_RESULT];
    }

    return await Promise.all(
      resultCodes.map(async (resultCode) => {
        const { data: data, status } = await this.#reqeustGet(
          "digital-forecast.do",
          `code=${resultCode.code}&unit=m%2Fs&hr1=Y`
        );
        if (!data || status !== 200) {
          return FAIL_RESULT;
        }

        const { data: temperatureData, status: status2 } =
          await this.#reqeustGet(
            "current-weather.do",
            `code=${resultCode.code}&unit=m%2Fs&aws=N`
          );
        if (!temperatureData || status2 !== 200) {
          return FAIL_RESULT;
        }

        const { temperature, windChill } =
          this.#getTemperature(temperatureData);
        const { img, weather: weather2 } = this.#getSummary(data);
        const name = this.#getName(city, resultCode);

        return {
          name: name,
          weather: weather2,
          temp: temperature,
          temp2: windChill,
          img: img,
        };
      })
    );
  }
}

export type WeatherLoaderResult = {
  name?: string;
  weather: string;
  temp: number;
  temp2: number;
  img: string;
};