import { GeneralPurposeCardResponse } from '../../framework/response/GeneralPurposeCardResponse';
import { Response } from '../../framework/response/Response';
import { DiffTime, TargetDateRuleTemplate } from './TargetDateRuleTemplate';

export class PengRule extends TargetDateRuleTemplate {
  match(src: string): boolean {
    return src === '!펭' || src === '!vpd';
  }

  async makeMessage(src: string): Promise<Response> {
    const finalTarget = this.createTargetDate(2021, 12, 20).getTime(); //수료
    const target = this.createTargetTime({ hour: 21 }).getTime();      //퇴근시각

    const diff = this.getDiff(target); //퇴근까지 남은시간 구하기

    const msg = this.#getDiffTimeMessage(diff);

  
    const finalDiff = this.getDiff(finalTarget);
    const { day } = finalDiff;
    
    return new GeneralPurposeCardResponse({
      title: msg,
      subtitle: `수료까지 .....${day + 1}일`,
      icon: 'https://i.imgur.com/3tO0j6f.jpg',
    });

  }
  #getDiffTimeMessage(diff: DiffTime): string{
    const { hour, minute, second } = diff;
    if ( hour >= 14){                 // 0시 이후 잠자는시간
      '휴식 시간!';
    }
    if ( hour < 14 && hour > 12 ){    //수업준비시간
      return '수업 준비시간 입니다...';
    }else if (hour > 0 && hour < 3 ){ //18시 ~ 21 시 보충수업 시간 반영
      return '18 ~ 21시 까지 보충수업 시간 입니다..';
    }else if (hour < 0) {
      return '학원에서 탈출!';
    }
    const timeStr = [
      hour > 0 ? `${hour}시간` : '',
      minute > 0 ? `${minute}분` : '',
      second > 0 ? `${second}초` : '',
      hour === 0 ? '!!' : '...',
    ].join(' ');
    return `펭 탈출까지 ${timeStr}`;
  }
}
