import { Response } from '../../framework/response/Response';
import { TextResponse } from '../../framework/response/TextReponse';
import { TextRule } from '../../framework/rule/TextRule';

export class ClockRule extends TextRule {
  match(src: string): boolean {
    return src == '!시간' || src == '!시계';
  }

  async makeMessage(src: string): Promise<Response> {
    const curDate = new Date();
    const h = curDate.getHours();
    const m = curDate.getMinutes();
    const s = curDate.getSeconds();
    const msg = `${h}시 ${m}분 ${s}초!!`;
    return new TextResponse(msg);
  }
}
