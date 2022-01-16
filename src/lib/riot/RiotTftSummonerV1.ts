import axios from 'axios';
import { Config } from '../../Config';
import { RiotBase } from './RiotBase';
import { RiotSummonerDto } from './RiotSummonerDto';

export class RiotTftSummonerV4 extends RiotBase {
  get uri(): string {
    return `https://${this.host}/tft/summoner/v1`;
  }

  async getSummonersByName(name: string): Promise<RiotSummonerDto | null> {
    const uri = `${this.uri}/summoners/by-name/${encodeURIComponent(name)}`;
    try {
      const { data } = await axios.get<RiotSummonerDto>(uri, {
        headers: {
          'X-Riot-Token': Config.getRiotTftApiKey(),
        },
      });
      return data;
    } catch {
      return null;
    }
  }
}
