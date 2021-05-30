import { Response } from '../../framework/response/Response';
import { TextResponse } from '../../framework/response/TextReponse';
import { TextRule } from '../../framework/rule/TextRule';

export class BojRule extends TextRule {
  public match(src: string): boolean {
    return (
      src.startsWith('!백준') ||
      src.startsWith('!문제') ||
      src.startsWith('!코딩')
    );
  }

  public async makeMessage(src: string): Promise<Response> {
    const word = src.indexOf(' ') != -1 ? src.substring(4) : 'p/rs';
    return new TextResponse(`http://boj.kr/${word}`);
  }
}
