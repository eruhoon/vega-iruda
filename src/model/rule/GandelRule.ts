import { TextRule } from '../../framework/rule/TextRule';

export class GandelRule implements TextRule {
  public match(src: string): boolean {
    return src == '!간' || src == '!간델';
  }

  public async makeMessage(src: string): Promise<string> {
    const curDate = new Date();
    const targetDate = new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate(), 19, 30, 0);
    let diffDate = +(targetDate) - +(curDate);

    let alreadyLate = (diffDate < 0) || (curDate.getHours() < 7);

    // add 1day to prevent minus time
    diffDate = alreadyLate ? (diffDate + 3600 * 24) : diffDate;
    diffDate /= 1000;

    const diffHour = (diffDate / 3600);
    const diffMin = (diffDate % 3600) / 60;
    const diffSec = (diffDate % 60);
    let msg = '간델의 다음 희망 퇴근시간까지 : '+ diffHour.toFixed() + '시 ' + diffMin.toFixed() + '분 ' + diffSec.toFixed() + '초!!';

    if(alreadyLate) {
        msg += '.....오늘은 퇴근했을까?';
    }
    return msg;
  }
}