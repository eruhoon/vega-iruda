import { TextRule } from '../../framework/rule/TextRule';

export class RandomNumberRule implements TextRule {
  public match(src: string): boolean {
    return src.startsWith('!랜덤 ');
  }

  public async makeMessage(src: string): Promise<string> {
    const match = /!랜덤 (.*)/.exec(src);
    let number = (match )? parseInt(match[1]) : NaN;
    if (!isNaN(number) && (number>31415 || number<2)) number = NaN;
    const word = (!isNaN(number))? Math.floor(Math.random()*number)+1: -1;
    return `${word}`;
  }
}
