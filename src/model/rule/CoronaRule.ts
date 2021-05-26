import axios from 'axios';
import * as cheerio from 'cheerio';

import { TextRule } from '../../framework/rule/TextRule';

export class CoronaRule implements TextRule {
  public match(src: string): boolean {
    return src === '!코로나';
  }

  public async makeMessage(_: string): Promise<string> {
    const { data } = await axios.get(
      'http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=11&ncvContSeq=&contSeq=&board_id=&gubun='
    );

    if (!data) {
      return '파싱 에러';
    }

    const $ = cheerio.load(data, {
      normalizeWhitespace: true,
    });
    const date = $('h5.s_title_in3 .t_date').eq(0).text();
    const rawTotal = $('.caseTable .inner_value').eq(0).text();
    return `${rawTotal} ${date}`;
  }
}
