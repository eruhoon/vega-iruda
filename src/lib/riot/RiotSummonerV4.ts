import axios from 'axios';
import { Config } from '../../Config';
import { RiotBase } from './RiotBase';
import { RiotSummonerDto } from './RiotSummonerDto';

export class RiotSummonerV4 extends RiotBase {
  get uri(): string {
    return `https://${this.host}/lol/summoner/v4`;
  }

  async getSummonersByName(name: string): Promise<RiotSummonerDto> {
    const uri = `${this.uri}/summoners/by-name/${encodeURIComponent(name)}`;
    const { data } = await axios.get<RiotSummonerDto>(uri, {
      headers: {
        'X-Riot-Token': Config.getRiotApiKey(),
      },
    });
    return data;
  }
}
