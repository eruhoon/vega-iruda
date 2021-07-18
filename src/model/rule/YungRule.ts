import { GeneralPurposeCardResponse } from '../../framework/response/GeneralPurposeCardResponse';
import { Response } from '../../framework/response/Response';
import { DiffTime, TargetDateRuleTemplate } from './TargetDateRuleTemplate';

export class YungRule extends TargetDateRuleTemplate {
  public match(src: string): boolean {
    return src === '!융' || src === '!dbd';
  }

  public async makeMessage(src: string): Promise<Response> {
    const finalTarget = this.createTargetDate(2021, 10, 2).getTime();
    const target = this.createTargetTime({ hour: 18 }).getTime();

    const diff = this.getDiff(target);

    const msg = this.#getDiffTimeMessage(diff);

    const finalDiff = this.getDiff(finalTarget);
    const { day } = finalDiff;

    return new GeneralPurposeCardResponse({
      title: msg,
      subtitle: `석방까진..... ${day + 1}일`,
      icon: 'https://i.imgur.com/FIgQea4b.png',
    });
  }

  #getDiffTimeMessage(diff: DiffTime): string {
    const { hour, minute, second } = diff;
    if (hour < 0) {
      return '퇴근했다!!!!';
    }
    const timeStr = [
      hour > 0 ? `${hour}시간` : '',
      minute > 0 ? `${minute}분` : '',
      second > 0 ? `${second}초` : '',
      hour === 0 ? '!!' : '...',
    ].join(' ');
    return `융퇴까지 ${timeStr}`;
  }
}
