import { Response } from '../../framework/response/Response';
import { TextResponse } from '../../framework/response/TextReponse';
import { TextRule } from '../../framework/rule/TextRule';

export class LoLSchessSearchRule extends TextRule {
  public match(src: string): boolean {
    return src.startsWith('!롤체 ');
  }

  public async makeMessage(src: string): Promise<Response> {
    const match = /!롤체 (.*)/.exec(src);
    const word = match ? match[1] : '';
    return new TextResponse(`https://lolchess.gg/profile/kr/${word}`);
  }
}
