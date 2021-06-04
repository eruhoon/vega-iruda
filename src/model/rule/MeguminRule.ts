import { Response } from '../../framework/response/Response';
import { TextResponse } from '../../framework/response/TextReponse';
import { DiffTime, TargetDateRuleTemplate } from './TargetDateRuleTemplate';

export class MeguminRule extends TargetDateRuleTemplate {
  public match(src: string): boolean {
    return src == '!메' || src == '!메구밍';
  }

  public async makeMessage(src: string): Promise<Response> {
    const curDate = new Date();
    const target = this.createTargetTime({ hour: 18 });
    const endDate = this.createTargetDate(2022, 3, 18);
    const endDiff = this.getDiff(endDate.getTime());

    const todayDiff = this.getDiff(target.getTime());
    const oneDay = 24 * 60 * 60 * 1000;
    const tomorrowDiff = this.getDiff(target.getTime() + oneDay);

    const alreadyLate = todayDiff.hour < 0 || curDate.getHours() < 7;
    const diff = alreadyLate ? tomorrowDiff : todayDiff;

    const prefix = '탈출 시간까지 ';
    const timeMsg = this.getDiffString(diff);
    const baseMsg = prefix + timeMsg;
    const outWorkMsg = '이미 놀고있는 메구밍입니다.';
    const resultMsg = alreadyLate ? outWorkMsg : baseMsg;
    const dayMsg = ` 탈출까지 ${endDiff.day + 1}일 남았습니다.`;
    const msg = resultMsg + dayMsg;

    return new TextResponse(msg);
  }

  private getDiffString(diff: DiffTime): string {
    const { hour, minute, second } = diff;
    return `${hour}시 ${minute}분 ${second}초!`;
  }
}
