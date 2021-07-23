import { Response } from '../../framework/response/Response';
import { TextResponse } from '../../framework/response/TextReponse';
import { TextRule } from '../../framework/rule/TextRule';

export class VaccineRule extends TextRule {
  match(src: string): boolean {
    return src === '!백신';
  }

  async makeMessage(src: string): Promise<Response> {
    return new TextResponse(
      'https://m.place.naver.com/rest/vaccine?vaccineFilter=used'
    );
  }
}
