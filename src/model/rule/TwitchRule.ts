import { Config } from '../../Config';
import { GeneralPurposeCardResponse } from '../../framework/response/GeneralPurposeCardResponse';
import { Response } from '../../framework/response/Response';
import { TextResponse } from '../../framework/response/TextReponse';
import { TwitchTokenLoader } from '../loader/twitch/TwitchTokenLoader';
import { TwitchUserLoader } from '../loader/twitch/TwitchUserLoader';
import { ArgumentRuleTemplate } from './ArgumentRuleTemplate';

export class TwitchRule extends ArgumentRuleTemplate {
  #tokenLoader = new TwitchTokenLoader(
    Config.getTwitchClientId(),
    Config.getTwitchClientSecret()
  );
  #userLoader = new TwitchUserLoader(Config.getTwitchClientId());

  constructor() {
    super('트위치');
  }

  protected async makeMessageWithArg(arg: string): Promise<Response> {
    const userId = arg;
    const token = await this.#tokenLoader.load();
    if (!token) {
      return new TextResponse('토큰 오류');
    }
    const users = await this.#userLoader.load([userId], token);
    if (!users || !users[0]) {
      return new TextResponse('유저 오류');
    }
    if (users && users[0]) {
      const user = users[0];
      const host = 'player.twitch.tv';
      const embedHost = Config.getTwitchEmbedHost();
      return new GeneralPurposeCardResponse({
        link: `https://${host}/?channel=${user.login}&parent=${embedHost}`,
        title: user.display_name,
        icon: user.profile_image_url,
        subtitle: user.description,
        showType: 'content-viewer',
        orientation: 'horizontal',
      });
    } else {
      return new TextResponse('내용 없음');
    }
  }
}
