import { GeneralPurposeCarouselResponse } from '../../framework/response/GeneralPurposeCarouselResponse';
import { Response } from '../../framework/response/Response';
import { TextRule } from '../../framework/rule/TextRule';

export class KarylRule extends TextRule {
  match(src: string): boolean {
    return src === '!캬루';
  }

  async makeMessage(src: string): Promise<Response> {
    return new GeneralPurposeCarouselResponse([
      {
        icon: 'https://i.imgur.com/wyfTUojb.png',
        title: '니들 사이트는',
        subtitle: '망했어!',
        link: 'http://www.nyan.cat/',
        showType: 'in-app-browser',
        orientation: 'horizontal',
      },
      {
        icon: 'https://i.imgur.com/hcCIrevb.jpg',
        title: '마캐는',
        subtitle: '이제 캬루가',
        link: 'http://www.nyan.cat/',
        showType: 'content-viewer',
        orientation: 'vertical',
      },
      {
        icon: 'https://i.imgur.com/RVh9Zvlb.png',
        title: '지배',
        subtitle: '한다!!!!',
        link: 'http://www.nyan.cat/',
        showType: 'new-window',
      },
    ]);
  }
}
