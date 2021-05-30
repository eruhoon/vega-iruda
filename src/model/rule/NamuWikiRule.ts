import { Response } from '../../framework/response/Response';
import { TextResponse } from '../../framework/response/TextReponse';
import { TextRule } from '../../framework/rule/TextRule';

export class NamuWikiRule extends TextRule {
  public match(src: string): boolean {
    return src.startsWith('!꺼라 ');
  }

  public async makeMessage(src: string): Promise<Response> {
    const match = /!꺼라 (.*)/.exec(src);
    const word = match ? match[1] : '';
    return new TextResponse(`https://namu.wiki/w/${word}`);
  }
}
