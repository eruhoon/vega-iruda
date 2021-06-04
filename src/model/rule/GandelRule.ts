import { Response } from '../../framework/response/Response';
import { TextResponse } from '../../framework/response/TextReponse';
import { DiffTime, TargetDateRuleTemplate } from './TargetDateRuleTemplate';

export class GandelRule extends TargetDateRuleTemplate {
  public match(src: string): boolean {
    return src == '!간' || src == '!간델';
  }

  public async makeMessage(src: string): Promise<Response> {
    const curDate = new Date();
    const target = this.createTargetTime({
      hour: 19,
      minute: 30,
    });
    const todayDiff = this.getDiff(target.getTime());
    const oneDay = 24 * 60 * 60 * 1000;
    const tomorrowDiff = this.getDiff(target.getTime() + oneDay);

    const alreadyLate = todayDiff.hour < 0 || curDate.getHours() < 7;
    const diff = alreadyLate ? tomorrowDiff : todayDiff;

    const diffKey = '간델의 다음 희망 퇴근시간까지';
    const diffMessage = `${diffKey} : ${this.getDiffString(diff)}`;
    const lateSuffix = this.getLateSuffix(alreadyLate);
    const message = diffMessage + lateSuffix;
    return new TextResponse(message);
  }

  private getDiffString(diff: DiffTime): string {
    const { hour, minute, second } = diff;
    return `${hour}시 ${minute}분 ${second}초!!`;
  }

  private getLateSuffix(late: boolean): string {
    const lateSuffix = '.....오늘은 퇴근했을까?';
    return late ? lateSuffix : '';
  }
}
