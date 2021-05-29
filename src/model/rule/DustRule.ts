import { TextRule } from '../../framework/rule/TextRule';

export class DustRule implements TextRule {
  public match(src: string): boolean {
    return src == '!미세' || src == '!미먼' || src == '!미세먼지';
  }

  public async makeMessage(src: string): Promise<string> {
    return 'https://weather.naver.com/air/';
  }
}
