import { Response } from '../../framework/response/Response';
import { TextResponse } from '../../framework/response/TextReponse';
import { ArgumentRuleTemplate } from './ArgumentRuleTemplate';

export class NamuWikiRule extends ArgumentRuleTemplate {
  constructor() {
    super('꺼라');
  }

  protected async makeMessageWithArg(arg: string): Promise<Response> {
    const word = arg;
    return new TextResponse(`https://namu.wiki/w/${word}`);
  }
}
