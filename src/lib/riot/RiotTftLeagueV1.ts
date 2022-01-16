import axios from 'axios';
import { Config } from '../../Config';
import { RiotBase } from './RiotBase';
import { RiotLeagueEntryDto } from './RiotLeagueEntryDto';

export class RiotTftLeagueV1 extends RiotBase {
  get uri(): string {
    return `https://${this.host}/tft/league/v1`;
  }

  async getEntriesBySummoner(
    summonerId: string
  ): Promise<RiotLeagueEntryDto[] | null> {
    const uri = `${this.uri}/entries/by-summoner/${summonerId}`;
    try {
      const { data } = await axios.get<RiotLeagueEntryDto[]>(uri, {
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
