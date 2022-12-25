import axios from 'axios';
import Cheerio from 'cheerio';
import cityCodes from './cityCodes.json';

export class CityWeatherLoader {
  #URL = "";
  readonly #FAILTEMP = -9999;

  getTempNumber(temp: string):number {
    const result = /(\-?\d+\.?[\d+])?℃/g.exec(temp);
    if ( result !== undefined && result !== null) {
      return Number(result[1])  
    } else {
      return this.#FAILTEMP;
    }
  }

  getHours(hour: number){
    if (hour < 10) {
      return `0${(hour)}:00`;
    } else {
      return `${(hour)}:00`;
    }
  }

  async load(city: string): Promise<WeatherLoaderResult[]> {
    const FAILTEMP = this.#FAILTEMP;
    const weather = { name: "", weather: "", temp: FAILTEMP, temp2: FAILTEMP, img: ""};
    const resultCode = cityCodes.filter((citycode)=>citycode.city === city);

    if (resultCode.length < 1) {
      return [weather];
    }

    return await Promise.all(resultCode.map(async(resultCode)=>{
      const weather = { name: "", weather: "", temp: FAILTEMP, temp2: FAILTEMP, img: ""};
      this.#URL = `https://www.weather.go.kr/w/wnuri-fct2021/main/digital-forecast.do?code=${resultCode.code}&unit=m%2Fs&hr1=Y`;
      const {data: data} = await axios.get(this.#URL, {
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
        }
      })
      this.#URL = `https://www.weather.go.kr/w/wnuri-fct2021/main/current-weather.do?code=${resultCode.code}&unit=m%2Fs&aws=N`;
      const {data: tempData} = await axios.get(this.#URL, {
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
        }
      })

      if (!data) {
        return weather; 
      }

      const temp = Cheerio.load(tempData);
      weather.temp = this.getTempNumber(temp('.wrap-1 .tmp').text());
      weather.temp2 = this.getTempNumber(temp('.wrap-1 .chill').text());
      console.log(temp('.wrap-1 .tmp').text(), temp('.wrap-1 .chill').text())
      const $ = Cheerio.load(data, {
        normalizeWhitespace: true,
      });

      const now = new Date();
      const date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
      const hour: string = this.getHours(now.getHours());
      const nextHour: string = this.getHours(now.getHours() + 1);
      const $targets = $('div.item-wrap ul.item');
  
      const $target = $targets.filter((index, element) => {
        const $e = $(element);
        
        if(date === $e.data('date') && ($e.data('time') === hour || $e.data('time') === nextHour) ) {
          return true
        } else {
          return false
        }
      }).find('li');
      const weatherAlt = $target.eq(1).find('span').eq(1).text() || $target.eq(1).find('span').eq(1).attr('title');
      weather.img = 'https://www.weather.go.kr/w/resources/icon/DY@64/A/Light/' + $target.eq(1).find('span').eq(1).attr('class')?.split(" ")[1] + ".png";
      // weather.temp = this.getTempNumber($target.eq(2).find('span').eq(1).text());
      // weather.temp2 = this.getTempNumber($target.eq(2).find('span').eq(2).text());
      weather.weather =  weatherAlt ? weatherAlt : '';

      if (resultCode.detail) {
        weather.name = resultCode.detail;
      }
      return weather;
    }))
  }
}

type WeatherLoaderResult = {
  name?: string;
  weather: string;
  temp: number;
  temp2: number;
  img: string;
};
