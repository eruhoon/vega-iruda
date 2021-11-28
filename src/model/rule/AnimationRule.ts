import { GeneralPurposeCardResponse } from '../../framework/response/GeneralPurposeCardResponse';
import { Response } from '../../framework/response/Response';
import { TextResponse } from '../../framework/response/TextReponse';
import { OnnadaAnimationLoader } from '../loader/animation/OnnadaAnimationLoader';
import { ArgumentRuleTemplate } from './ArgumentRuleTemplate';

export class AnimationRule extends ArgumentRuleTemplate {
  #loader = new OnnadaAnimationLoader();

  constructor() {
    super('애니');
  }

  protected async makeMessageWithArg(arg: string): Promise<Response> {
    const animation = await this.#loader.load(arg);
    if (animation === null) {
      return new TextResponse('애니 없음');
    } else {
      return new GeneralPurposeCardResponse({
        link: animation.link,
        title: animation.title,
        icon: animation.thumbnail,
        subtitle: `${animation.genre} ${animation.thumbnail}`,
        orientation: 'vertical',
        showType: 'in-app-browser',
      });
    }
  }
}
