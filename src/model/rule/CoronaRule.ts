import axios from 'axios';
import * as cheerio from 'cheerio';
import { GeneralPurposeCardBody } from '../../framework/response/body/GeneralPurposeCardBody';
import { GeneralPurposeCardResponse } from '../../framework/response/GeneralPurposeCardResponse';
import { Response } from '../../framework/response/Response';
import { TextResponse } from '../../framework/response/TextReponse';
import { TextRule } from '../../framework/rule/TextRule';

export class CoronaRule extends TextRule {
  public match(src: string): boolean {
    return src === '!코로나';
  }

  public async makeMessage(_: string): Promise<Response> {
    const { data } = await axios.get(
      'http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=11&ncvContSeq=&contSeq=&board_id=&gubun='
    );

    if (!data) {
      return new TextResponse('파싱 에러');
    }

    const $ = cheerio.load(data, {
      normalizeWhitespace: true,
    });
    const date = $('h5.s_title_in3 .t_date').eq(0).text();
    const rawTotal = $('.caseTable .inner_value').eq(0).text();

    return new GeneralPurposeCardResponse({
      link: 'https://corona-live.com/',
      title: rawTotal,
      subtitle: date,
      icon: 'https://i.imgur.com/B9H3UYL.png',
    });
  }
}
