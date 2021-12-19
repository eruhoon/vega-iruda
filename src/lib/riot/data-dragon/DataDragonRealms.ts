import axios from 'axios';

export class DataDragonRealms {
  async load(): Promise<Result> {
    const uri = 'https://ddragon.leagueoflegends.com/realms/kr.json';
    const { data } = await axios.get(uri);
    return data;
  }
}

type Result = {
  n: {
    item: string;
    rune: string;
    mastery: string;
    summoner: string;
    champion: string;
    profileicon: string;
    map: string;
    language: string;
    sticker: string;
  };
  v: string;
  l: string;
  cdn: string;
  dd: string;
  lg: string;
  css: string;
  profileiconmax: number;
  store: any;
};
