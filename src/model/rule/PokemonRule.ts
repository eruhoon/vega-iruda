import axios from 'axios';
import * as cheerio from 'cheerio';

import { TextRule } from '../../framework/rule/TextRule';

export class PokemonRule implements TextRule {
  public match(src: string): boolean {
    return src.startsWith('!벌레 ');
  }

  public async makeMessage(src: string): Promise<string> {
    const { data } = await axios.get(
      'https://pokemon.fandom.com/ko/wiki/%EC%A0%84%EA%B5%AD%EB%8F%84%EA%B0%90'
    );

    if (!data) {
      return '파싱 에러';
    }
    const match = /!벌레 (.*)/.exec(src);
    const word = match ? match[1] : '';

    if (word != '') {
        const $ = cheerio.load(data, {
            normalizeWhitespace: true,
        });
        const idx = (isNaN(parseInt(word)))? 3: 1;
        
        const href = $(`td:contains('${word}')`).filter(function(i) {
            return $(`td:contains('${word}')`).eq(i).index() == idx;
        }).parent().find('td:eq(3) a').attr('href');
        return (href === undefined)? decodeURI('https://pokemon.fandom.com/ko/wiki/전국도감') 
        : decodeURI(`https://pokemon.fandom.com${href}`);
    }
    else return decodeURI('https://pokemon.fandom.com/ko/wiki/전국도감');
  }
}
