import axios from 'axios';
import { Config } from '../../Config';
import { RiotBase } from './RiotBase';
import { RiotLeaugeEntryDto } from './RiotLeagueEntryDto';

export class RiotTftLeagueV1 extends RiotBase {
  get uri(): string {
    return `https://${this.host}/tft/league/v1`;
  }

  async getEntriesBySummoner(
    summonerId: string
  ): Promise<RiotLeaugeEntryDto[] | null> {
    const uri = `${this.uri}/entries/by-summoner/${summonerId}`;
    try {
      const { data } = await axios.get<RiotLeaugeEntryDto[]>(uri, {
        headers: {
          'X-Riot-Token': Config.getRiotApiKey(),
        },
      });
      return data;
    } catch {
      return null;
    }
  }
}
