import axios from 'axios';
import { GeneralPurposeCarouselResponse } from '../../framework/response/GeneralPurposeCarouselResponse';
import { Response } from '../../framework/response/Response';
import { TextResponse } from '../../framework/response/TextReponse';
import { TextRule } from '../../framework/rule/TextRule';

export class HoenyChampRule extends TextRule {
  match(src: string): boolean {
    return (
      ['탑', '탑솔', '미드', '정글', '원딜', '바텀', '서폿', '서포터'].some(
        (pos) => `!꿀챔 ${pos}` === src
      ) || src === '!꿀챔'
    );
  }

  async makeMessage(src: string): Promise<Response> {
    const match = /!꿀챔( (.*))?/.exec(src);
    if (!match) {
      return new TextResponse('에러');
    }
    const loaded = (await this.#load()).filter((e) => e.is_honey);
    let filtered: PsHoneyChamp[];
    switch (match[2]) {
      case '탑':
      case '탑솔':
        filtered = loaded.filter((e) => e.lane__lane_name_kr === '탑');
        break;
      case '정글':
        filtered = loaded.filter((e) => e.lane__lane_name_kr === '정글');
        break;
      case '미드':
        filtered = loaded.filter((e) => e.lane__lane_name_kr === '미드');
        break;
      case '바텀':
      case '원딜':
        filtered = loaded.filter((e) => e.lane__lane_name_kr === '원딜');
        break;
      case '서폿':
      case '서포터':
        filtered = loaded.filter((e) => e.lane__lane_name_kr === '서폿');
        break;
      default:
        filtered = loaded;
    }

    return new GeneralPurposeCarouselResponse(
      filtered
        .map((e) => {
          return {
            icon: `https://s3.lol.ps/file/lol-ps/static/img/champion-portrait/${e.champion__data_key}.webp`,
            link: `https://lol.ps/champ/${e.champion__data_key}/statistics`,
            title: `${e.champion__name}(${e.lane__lane_name_kr})`,
            subtitle: `승률: ${e.win_rate}%`,
          };
        })
        .filter((_, i) => i < 10)
    );
  }

  async #load(): Promise<PsHoneyChamp[]> {
    const { data } = await axios.get<PsHoenyChampRes>(
      'https://lol.ps/lol/get_lane_champion_tier_list/?tier=2&order_by=-honey_score'
    );
    return data.results;
  }
}

type PsHoenyChampRes = {
  results: PsHoneyChamp[];
};

type PsHoneyChamp = {
  is_honey: boolean;
  champion__data_key: number;
  champion__name: string;
  lane__lane_name_kr: string;
  win_rate: string;
};
