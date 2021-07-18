import { Response } from '../../framework/response/Response';
import { TextResponse } from '../../framework/response/TextReponse';
import { TextRule } from '../../framework/rule/TextRule';

export class PengRule extends TextRule {
  match(src: string): boolean {
    return src === '!펭' || src === '!vpd';
  }

  async makeMessage(src: string): Promise<Response> {
    let msg = '';
    const nowDate = new Date().getTime();
    const targetDate = new Date(2021, 3, 18).getTime();

    const diff = (nowDate - targetDate) / 1000;
    const diffDay = diff / 3600 / 24;
    const diffHour = (diff / 3600) % 24;
    const diffMin = (diff % 3600) / 60;
    const diffSec = diff % 60;

    msg = `펭은 곤뇽으로 부터 탈출한지 +${diffDay.toFixed()}일 ${diffHour.toFixed()}시간 ${diffMin.toFixed()}분 ${diffSec.toFixed()}초 지났읍니다`;
    return new TextResponse(msg);
  }
}
