import { GeneralPurposeCardBody } from '../../framework/response/body/GeneralPurposeCardBody';
import { GeneralPurposeCardResponse } from '../../framework/response/GeneralPurposeCardResponse';
import { Response } from '../../framework/response/Response';
import { TextRule } from '../../framework/rule/TextRule';

export class YungRule extends TextRule {
  public match(src: string): boolean {
    return src === '!융' || src === '!dbd';
  }

  public async makeMessage(src: string): Promise<Response> {
    const now = new Date();
    const target = this.getTargetDate(now, 18).getTime();
    const diff = this.getDiff(target);

    const { hour, minute, second } = diff;
    const msg = `${hour}시간 ${minute}분 ${second}초...`;

    return new GeneralPurposeCardResponse(
      new GeneralPurposeCardBody(
        '',
        msg,
        'https://i.imgur.com/FIgQea4b.png',
        '융퇴근까지.....',
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

    const diff = target - now;
    return {
      hour: Math.floor(diff / oneHour),
      minute: Math.floor((diff % oneHour) / oneMinute),
      second: Math.floor((diff % oneMinute) / oneSecond),
    };
  }
}

type DiffTime = {
  hour: number;
  minute: number;
  second: number;
};
