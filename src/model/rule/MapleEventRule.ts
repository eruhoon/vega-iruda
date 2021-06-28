import axios from 'axios';
import Cheerio from 'cheerio';
import { GeneralPurposeCarouselResponse } from '../../framework/response/GeneralPurposeCarouselResponse';
import { Response } from '../../framework/response/Response';
import { TextRule } from '../../framework/rule/TextRule';

export class MapleEventRule extends TextRule {
  public match(src: string): boolean {
    return src === '!메이플이벤트';
  }

  public async makeMessage(src: string): Promise<Response> {
    const uri = 'https://m.maplestory.nexon.com/News/Event/Ongoing';
    const { data: body } = await axios.get(uri);
    const $ = Cheerio.load(body, {
      normalizeWhitespace: true,
      lowerCaseAttributeNames: true,
    });
    const options = $('div.event-list a')
      .toArray()
      .map((e) => {
        const $e = $(e);
        const $icon = $e.find('.content-thumbnail img');
        const $title = $e.find('span.content-title');
        const $info = $e.find('.ui-list-info');
        const icon = $icon.attr('src') || '';
        const title = $title.text();
        const subtitle = $info.text().replace(/\n/g, '').trim();
        return { icon, title, subtitle };
      });
    return new GeneralPurposeCarouselResponse(options);
  }
}
