import axios from 'axios';
import Cheerio from 'cheerio';
import * as iconv from 'iconv-lite';
import { Loader } from '../Loader';

export class WeatherLoader implements Loader<WeatherLoaderResult[]> {
  readonly #URL = 'https://www.weather.go.kr/weather/main-now-weather.jsp';

  public async load(): Promise<WeatherLoaderResult[]> {
    const { data: rawBody } = await axios.get(this.#URL, {
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
    const weathers: WeatherLoaderResult[] = $weathers.toArray().map((e) => {
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

type WeatherLoaderResult = {
  name: string;
  weather: string;
  temp: number;
  img: string;
};
