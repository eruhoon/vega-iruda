import { TextRule } from '../../framework/rule/TextRule';

export class ClockRule implements TextRule {
  public match(src: string): boolean {
    return src == '!시간' || src == '!시계';
  }

  public async makeMessage(src: string): Promise<string> {
    const CurDate = new Date();
    const Msg = CurDate.getHours() + '시 ' + CurDate.getMinutes() + '분 ' + CurDate.getSeconds() + '초!!';
    return Msg;
  }
}