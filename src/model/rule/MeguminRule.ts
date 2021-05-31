import { Response } from '../../framework/response/Response';
import { TextResponse } from '../../framework/response/TextReponse';
import { TextRule } from '../../framework/rule/TextRule';

export class MeguminRule extends TextRule {
  public match(src: string): boolean {
    return src == '!메' || src == '!메구밍';
  }

  public async makeMessage(src: string): Promise<Response> {
    const curDate = new Date();
    const targetDate = new Date(
      curDate.getFullYear(),
      curDate.getMonth(),
      curDate.getDate(),
      18,
      0,
      0
    );
    const currentDate = new Date();
    const endDate = new Date("2022-03-18");
    const diffDays = Math.floor((endDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));

    let diffDate = +targetDate - +curDate;
    let alreadyLate = diffDate < 0 || curDate.getHours() < 7;

    // add 1day to prevent minus time
    diffDate = alreadyLate ? diffDate + 3600 * 24 : diffDate;
    diffDate /= 1000;

    const diffHour = diffDate / 3600;
    const diffMin = (diffDate % 3600) / 60;
    const diffSec = diffDate % 60;
    let msg =
      '탈출 시간까지 ' +
      diffHour.toFixed() +
      '시 ' +
      diffMin.toFixed() +
      '분 ' +
      diffSec.toFixed() +
      '초!';

    if (alreadyLate) {
      msg = '이미 놀고있는 메구밍입니다.';
    }
    
    msg += ` 탈출까지 ${diffDays}일 남았습니다.`

    return new TextResponse(msg);
  }
}
