import { Response } from '../../framework/response/Response';
import { TextResponse } from '../../framework/response/TextReponse';
import { TextRule } from '../../framework/rule/TextRule';

export class SearchRule extends TextRule {
  match(src: string): boolean {
    return src.startsWith('!검색 ');
  }

  async makeMessage(src: string): Promise<Response> {
    const match = /!검색 (.*)/.exec(src);
    const patt = /([+`~!@#$%^&*|\\\'\";:\/?])/gi;
    const word = match
      ? match[1].replace(patt, (s) => encodeURIComponent(s))
      : '';
    return new TextResponse(`https://www.google.co.kr/search?q=${word}`);
  }
}
