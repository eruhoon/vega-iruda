import { Response } from '../../framework/response/Response';
import { TextResponse } from '../../framework/response/TextReponse';
import { ArgumentRuleTemplate } from './ArgumentRuleTemplate';

export class MapleGgRule extends ArgumentRuleTemplate {
  public constructor() {
    super('메이플');
  }

  protected async makeMessageWithArg(arg: string): Promise<Response> {
    const id = arg;
    return new TextResponse(`https://maple.gg/u/${id}`);
  }
}
