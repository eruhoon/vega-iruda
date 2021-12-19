import axios from 'axios';
import { Config } from '../../Config';
import { RiotBase } from './RiotBase';
import { RiotLeagueEntryDto } from './RiotLeagueEntryDto';

export class RiotLeagueV4 extends RiotBase {
  get uri(): string {
    return `https://${this.host}/lol/league/v4`;
  }

  async getEntriesBySummoner(
    summonerId: string
  ): Promise<RiotLeagueEntryDto[] | null> {
    const uri = `${this.uri}/entries/by-summoner/${summonerId}`;
    try {
      const { data } = await axios.get<RiotLeagueEntryDto[]>(uri, {
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
