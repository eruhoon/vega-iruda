import { GeneralPurposeCardResponse } from '../../framework/response/GeneralPurposeCardResponse';
import { Response } from '../../framework/response/Response';
import { TextResponse } from '../../framework/response/TextReponse';
import { RiotLeagueEntryDto } from '../../lib/riot/RiotLeagueEntryDto';
import { RiotSummonerDto } from '../../lib/riot/RiotSummonerDto';
import { RiotTftLeagueV1 } from '../../lib/riot/RiotTftLeagueV1';
import { RiotTftSummonerV4 } from '../../lib/riot/RiotTftSummonerV1';
import { LolStaticLoader } from '../loader/lol/static/LolStaticLoader';
import { ArgumentRuleTemplate } from './ArgumentRuleTemplate';

export class LoLSchessSearchRule extends ArgumentRuleTemplate {
  #summonerLoader = new RiotTftSummonerV4();
  #leagueLoader = new RiotTftLeagueV1();
  #staticLoader = new LolStaticLoader();

  constructor() {
    super('롤체');
  }

  protected async makeMessageWithArg(arg: string): Promise<Response> {
    const word = arg;

    // return new TextResponse(`https://lolchess.gg/profile/kr/${word}`);

    const summoner = await this.#summonerLoader.getSummonersByName(word);
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
    return `https://lolchess.gg/profile/kr/${encoded}`;
  }
}
