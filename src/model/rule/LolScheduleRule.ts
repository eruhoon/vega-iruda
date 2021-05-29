import { TextRule } from '../../framework/rule/TextRule';

export class LolScheduleRule implements TextRule {
  public match(src: string): boolean {
    return src == '!롤일정' || src == '!lck' || src == '!LCK'
    || src == '!롤드컵' || src == '!월즈';
  }

  public async makeMessage(src: string): Promise<string> {
    return 'https://lolesports.com/schedule?leagues=lck,worlds';
  }
}
