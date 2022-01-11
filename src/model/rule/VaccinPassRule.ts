import { GeneralPurposeCardResponse } from '../../framework/response/GeneralPurposeCardResponse';
import { Response } from '../../framework/response/Response';
import { TextRule } from '../../framework/rule/TextRule';

export class VaccinePassRule extends TextRule {
  match(src: string): boolean {
    return src === '!백신패스';
  }

  async makeMessage(src: string): Promise<Response> {
    const convertDateToStr = (date: Date) => {
      return (
        date.getFullYear().toString().substring(2, 4) +
        '.' +
        (date.getMonth() + 1) +
        '.' +
        date.getDate()
      );
    };

    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - 180);
    const endDate = new Date();
    endDate.setDate(today.getDate() - 15);

    const start = convertDateToStr(startDate);
    const end = convertDateToStr(endDate);
    const todayStr = convertDateToStr(today);
    const weekArr = ['일', '월', '화', '수', '목', '금', '토'];
    const base = '’' + todayStr + '(' + weekArr[today.getDay()] + ')';

    return new GeneralPurposeCardResponse({
      icon: 'https://ncv.kdca.go.kr/kor/img/header/shim.png',
      link: 'https://ncv.kdca.go.kr/menu.es?mid=a12700000000',
      showType: 'in-app-browser',
      title: `${start} ~ ${end} 사이 접종자`,
      subtitle: `${base} 기준`,
    });
  }
}
