import { GeneralPurposeCardResponse } from '../../framework/response/GeneralPurposeCardResponse';
import { Response } from '../../framework/response/Response';
import { TextResponse } from '../../framework/response/TextReponse';
import { RiotLeagueV4 } from '../../lib/riot/RiotLeagueV4';
import { RiotSummonerV4 } from '../../lib/riot/RiotSummonerV4';
import { ArgumentRuleTemplate } from './ArgumentRuleTemplate';

export class LolUserRule extends ArgumentRuleTemplate {
  #userLoader = new RiotSummonerV4();
  #leagueLoader = new RiotLeagueV4();

  constructor() {
    super('롤');
  }

  protected async makeMessageWithArg(arg: string): Promise<Response> {
    const summonerName = arg;
    const summoner = await this.#userLoader.getSummonerByName(summonerName);
    if (!summoner) {
      return new TextResponse('소환사 없음');
    }
    const leagues = await this.#leagueLoader.getEntriesBySummoner(summoner.id);
    if (!leagues || !leagues[0]) {
      return new TextResponse('리그 정보 없음');
    }
    const league = leagues[0];
    return new GeneralPurposeCardResponse({
      icon: `http://ddragon.leagueoflegends.com/cdn/11.24.1/img/profileicon/${summoner.profileIconId}.png`,
      title: summoner.name,
      subtitle: `Lv. ${summoner.summonerLevel} / ${league.tier} ${league.rank}`,
      link: this.#createLink(summonerName),
      orientation: 'horizontal',
      showType: 'in-app-browser',
    });
  }

  #createLink(summonerName: string): string {
    const encoded = encodeURIComponent(summonerName);
    return `https://www.op.gg/summoner/userName=${encoded}`;
  }
}
