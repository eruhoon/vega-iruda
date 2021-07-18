import { Response } from '../../framework/response/Response';
import { TextResponse } from '../../framework/response/TextReponse';
import { TextRule } from '../../framework/rule/TextRule';

export class DustRule extends TextRule {
  match(src: string): boolean {
    return src == '!미세' || src == '!미먼' || src == '!미세먼지';
  }

  async makeMessage(src: string): Promise<Response> {
    return new TextResponse('https://weather.naver.com/air/');
  }
}
