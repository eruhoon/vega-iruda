import { Response } from '../../framework/response/Response';
import { TextResponse } from '../../framework/response/TextReponse';
import { TextRule } from '../../framework/rule/TextRule';

export abstract class ArgumentRuleTemplate extends TextRule {
  #command: string;

  constructor(command: string) {
    super();
    this.#command = command;
  }

  match(src: string): boolean {
    return src.startsWith(`!${this.#command} `);
  }

  async makeMessage(src: string): Promise<Response> {
    const regex = new RegExp(`!${this.#command} (.*)`);
    const match = regex.exec(src);
    if (!match) {
      return new TextResponse('매칭 에러');
    }
    const arg = match[1] || '';
    return await this.makeMessageWithArg(arg);
  }

  protected abstract makeMessageWithArg(arg: string): Promise<Response>;
}
