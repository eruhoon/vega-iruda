import { TextRule } from '../../framework/rule/TextRule';

export class BojRule implements TextRule {
  public match(src: string): boolean {
    return src.startsWith('!백준') || src.startsWith('!문제') || src.startsWith('!코딩');
  }

  public async makeMessage(src: string): Promise<string> {
    const word = src.indexOf(" ") != -1 ? src.substring(4) : 'p/rs';
    return `http://boj.kr/${word}`;
  }
}
