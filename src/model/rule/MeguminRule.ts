import { Response } from '../../framework/response/Response';
import { TextResponse } from '../../framework/response/TextReponse';
import { DiffTime, TargetDateRuleTemplate } from './TargetDateRuleTemplate';

export class MeguminRule extends TargetDateRuleTemplate {
  public match(src: string): boolean {
    return src === '!메' || src === '!메구밍';
  }

  public async makeMessage(src: string): Promise<Response> {
    const resultMsg = this.getDiffMessage();
    const duedateMsg = this.getDuedateMessage();
    const msg = [resultMsg, duedateMsg].join(' ');
    return new TextResponse(msg);
  }

  private getDiffMessage(): string {
    const { diff, late } = this.getStatus();
    const workMsg = `탈출 시간까지 ${this.getDiffString(diff)}`;
    const outWorkMsg = '이미 놀고있는 메구밍입니다.';
    return late ? outWorkMsg : workMsg;
  }

  private getStatus(): Status {
    const now = new Date();
    const target = this.createTargetTime({ hour: 18 });
    const todayDiff = this.getDiff(target.getTime());
    const oneDay = 24 * 60 * 60 * 1000;
    const tomorrowDiff = this.getDiff(target.getTime() + oneDay);
    const late = todayDiff.hour < 0 || now.getHours() < 7;
    const diff = late ? tomorrowDiff : todayDiff;
    return { diff, late };
  }

  private getDiffString(diff: DiffTime): string {
    const { hour, minute, second } = diff;
    return `${hour}시 ${minute}분 ${second}초!`;
  }

  private getDuedateMessage(): string {
    const target = this.createTargetDate(2022, 3, 18);
    const diff = this.getDiff(target.getTime());
    return ` 탈출까지 ${diff.day + 1}일 남았습니다.`;
  }
}

type Status = {
  diff: DiffTime;
  late: boolean;
};
