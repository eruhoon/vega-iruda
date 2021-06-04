import { GeneralPurposeCardBody } from '../../framework/response/body/GeneralPurposeCardBody';
import { GeneralPurposeCardResponse } from '../../framework/response/GeneralPurposeCardResponse';
import { Response } from '../../framework/response/Response';
import { TextRule } from '../../framework/rule/TextRule';

export class YungRule extends TextRule {
  public match(src: string): boolean {
    return src === '!융' || src === '!dbd';
  }

  public async makeMessage(src: string): Promise<Response> {
    const finalTarget = new Date('2021-10-02').getTime();
    const now = new Date();
    const target = this.getTargetDate(now, 18).getTime();

    const diff = this.getDiff(target);
    const { hour, minute, second } = diff;

    const finalDiff = this.getDiff(finalTarget);
    const { day } = finalDiff;

    return new GeneralPurposeCardResponse(
      new GeneralPurposeCardBody(
        '',
        `융퇴까지 ${hour}시간 ${minute}분 ${second}초...`,
        'https://i.imgur.com/FIgQea4b.png',
        `석방까진..... ${day + 1}일`,
        false
      )
    );
  }

  private getTargetDate(now: Date, hour: number): Date {
    const target = new Date(now);
    target.setHours(hour);
    target.setMinutes(0);
    target.setSeconds(0);
    target.setMilliseconds(0);
    return target;
  }

  private getDiff(target: number): DiffTime {
    const now = new Date().getTime();
    const oneSecond = 1000;
    const oneMinute = 60 * oneSecond;
    const oneHour = 60 * oneMinute;
    const oneDay = 24 * oneHour;

    const diff = target - now;
    return {
      day: Math.floor(diff / oneDay),
      hour: Math.floor(diff % oneDay) / oneHour,
      minute: Math.floor((diff % oneHour) / oneMinute),
      second: Math.floor((diff % oneMinute) / oneSecond),
    };
  }
}

type DiffTime = {
  day: number;
  hour: number;
  minute: number;
  second: number;
};
