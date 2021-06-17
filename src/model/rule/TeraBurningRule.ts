import { Response } from '../../framework/response/Response';
import { TextResponse } from '../../framework/response/TextReponse';
import { TextRule } from '../../framework/rule/TextRule';

export class TeraBurningRule extends TextRule {
  public match(src: string): boolean {
    return src == '!테라버닝';
  }

  public async makeMessage(src: string): Promise<Response> {
    return new TextResponse(
      'https://maplestory.nexon.com/News/Event/465'
    );
  }
}
