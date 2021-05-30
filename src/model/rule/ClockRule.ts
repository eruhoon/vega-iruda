import { Response } from '../../framework/response/Response';
import { TextResponse } from '../../framework/response/TextReponse';
import { TextRule } from '../../framework/rule/TextRule';

export class ClockRule extends TextRule {
  public match(src: string): boolean {
    return src == '!시간' || src == '!시계';
  }

  public async makeMessage(src: string): Promise<Response> {
    const CurDate = new Date();
    const Msg =
      CurDate.getHours() +
      '시 ' +
      CurDate.getMinutes() +
      '분 ' +
      CurDate.getSeconds() +
      '초!!';
    return new TextResponse(Msg);
  }
}
