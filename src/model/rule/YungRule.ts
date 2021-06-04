import { Response } from '../../framework/response/Response';
import { TextResponse } from '../../framework/response/TextReponse';
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
    const msg = `융 퇴근까지 ${hour}시간 ${minute}분 ${second}초....`;
    return new TextResponse(msg);
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
