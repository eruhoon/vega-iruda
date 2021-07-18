import { Response } from '../../framework/response/Response';
import { TextResponse } from '../../framework/response/TextReponse';
import { TextRule } from '../../framework/rule/TextRule';

export class TeraBurningRule extends TextRule {
  match(src: string): boolean {
    return src === '!테라버닝';
  }

  async makeMessage(src: string): Promise<Response> {
    return new TextResponse('https://maplestory.nexon.com/News/Event/465');
  }
}
