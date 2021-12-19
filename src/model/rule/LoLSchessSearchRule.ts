import { Response } from '../../framework/response/Response';
import { TextResponse } from '../../framework/response/TextReponse';
import { TextRule } from '../../framework/rule/TextRule';

export class LoLSchessSearchRule extends TextRule {
  // #summonerLoader = new RiotTftSummonerV4();
  // #leagueLoader = new RiotTftLeagueV1();

  match(src: string): boolean {
    return src.startsWith('!롤체 ');
  }

  async makeMessage(src: string): Promise<Response> {
    const match = /!롤체 (.*)/.exec(src);
    const word = match ? match[1] : '';

    return new TextResponse(`https://lolchess.gg/profile/kr/${word}`);

    /*const summoner = await this.#summonerLoader.getSummonersByName(word);
    if (!summoner) {
      return new TextResponse('소환사 없음');
    }
    const leagues = await this.#leagueLoader.getEntriesBySummoner(summoner.id);
    if (!leagues || !leagues[0]) {
      return new TextResponse('리그 분석 에러');
    }
    const league = leagues[0];
    return new GeneralPurposeCardResponse({
      icon: `http://ddragon.leagueoflegends.com/cdn/11.24.1/img/profileicon/${summoner.profileIconId}.png`,
      title: summoner.name,
      subtitle: `Lv. ${summoner.summonerLevel} / ${league.tier} ${league.rank}`,
      link: `https://lolchess.gg/profile/kr/${word}`,
      orientation: 'horizontal',
      showType: 'in-app-browser',
    });*/
  }
}
