import { GeneralPurposeCardResponse } from '../../framework/response/GeneralPurposeCardResponse';
import { Response } from '../../framework/response/Response';
import { TextResponse } from '../../framework/response/TextReponse';
import { RiotLeagueEntryDto } from '../../lib/riot/RiotLeagueEntryDto';
import { RiotLeagueV4 } from '../../lib/riot/RiotLeagueV4';
import { RiotSummonerDto } from '../../lib/riot/RiotSummonerDto';
import { RiotSummonerV4 } from '../../lib/riot/RiotSummonerV4';
import { LolStaticLoader } from '../loader/lol/static/LolStaticLoader';
import { ArgumentRuleTemplate } from './ArgumentRuleTemplate';

export class LolUserRule extends ArgumentRuleTemplate {
  #userLoader = new RiotSummonerV4();
  #leagueLoader = new RiotLeagueV4();
  #staticLoader = new LolStaticLoader();

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
      return this.#createResponse(summoner);
    } else {
      const league = leagues[0];
      return this.#createResponse(summoner, league);
    }
  }

  async #createResponse(
    summoner: RiotSummonerDto,
    league?: RiotLeagueEntryDto
  ) {
    const levelInfo = `Lv. ${summoner.summonerLevel}`;
    const leagueInfo = league ? `${league.tier} ${league.rank}` : null;
    const subtitle = leagueInfo ? `${levelInfo} / ${leagueInfo}` : levelInfo;
    return new GeneralPurposeCardResponse({
      icon: await this.#staticLoader.getProfileIcon(summoner.profileIconId),
      title: summoner.name,
      subtitle,
      link: this.#createLink(summoner.name),
      orientation: 'horizontal',
      showType: 'in-app-browser',
    });
  }

  #createLink(summonerName: string): string {
    const encoded = encodeURIComponent(summonerName);
    return `https://www.op.gg/summoner/userName=${encoded}`;
  }
}
