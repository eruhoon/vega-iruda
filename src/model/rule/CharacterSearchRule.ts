import { Response } from '../../framework/response/Response';
import { TextResponse } from '../../framework/response/TextReponse';
import { TextRule } from '../../framework/rule/TextRule';

export class CharacterSearchRule extends TextRule {
  public match(src: string): boolean {
    return src.startsWith('!캐릭 ');
  }

  public async makeMessage(src: string): Promise<Response> {
    const match = /!캐릭 (.*)/.exec(src);
    const word = match ? match[1] : '';
    return new TextResponse(`https://onnada.com/character/search?q=${word}`);
  }
}
