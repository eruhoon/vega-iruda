import { Response } from '../../framework/response/Response';
import { TextResponse } from '../../framework/response/TextReponse';
import { TextRule } from '../../framework/rule/TextRule';

export class RandomNumberRule extends TextRule {
  match(src: string): boolean {
    return src.startsWith('!랜덤 ');
  }

  async makeMessage(src: string): Promise<Response> {
    const maxNumber = this.#parseMaxNumber(src);
    const generated = this.#generateNumber(maxNumber);
    return new TextResponse(`${generated}`);
  }

  #parseMaxNumber(src: string): number {
    const match = /!랜덤 (.*)/.exec(src);
    const maxNumber = match ? parseInt(match[1]) : NaN;
    return maxNumber;
  }

  #generateNumber(max: number): number {
    if (isNaN(max) || max > 31415 || max < 2) {
      return -1;
    }
    return Math.floor(Math.random() * max) + 1;
  }
}
