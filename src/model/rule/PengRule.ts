import { Response } from '../../framework/response/Response';
import { TextResponse } from '../../framework/response/TextReponse';
import { TextRule } from '../../framework/rule/TextRule';

export class PengRule extends TextRule {
  public match(src: string): boolean {
    return src == '!펭' || src == "!vpd"
  }

  public async makeMessage(src: string): Promise<Response> {
    let msg = "";
    const nowDate = new Date();
    const targetDate = new Date(
      2021,
      3,
      18
    );
    
    let diffDay = (+nowDate- +targetDate)/3600/24/1000; 
    msg = `탈출한지 ${diffDay.toFixed()}일 지났읍니다`
    return new TextResponse(msg);
  }
}
