import { RiotMiniSeriesDto } from './RiotMiniSeriesDto';

export type RiotLeaugeEntryDto = {
  leagueId: string; //	Not included for the RANKED_TFT_TURBO queueType.
  summonerId: string; //	Player's encrypted summonerId.
  summonerName: string;
  queueType: string;
  ratedTier: string; //	Only included for the RANKED_TFT_TURBO queueType. (Legal values: ORANGE, PURPLE, BLUE, GREEN, GRAY)
  ratedRating: number; //	Only included for the RANKED_TFT_TURBO queueType.
  tier: string; //	Not included for the RANKED_TFT_TURBO queueType.
  rank: string; //	A player's division within a tier. Not included for the RANKED_TFT_TURBO queueType.
  leaguePoints: number; //	Not included for the RANKED_TFT_TURBO queueType.
  wins: number; //	First placement.
  losses: number; //Second through eighth placement.
  hotStreak: boolean; //	Not included for the RANKED_TFT_TURBO queueType.
  veteran: boolean; //	Not included for the RANKED_TFT_TURBO queueType.
  freshBlood: boolean; //	Not included for the RANKED_TFT_TURBO queueType.
  inactive: boolean; //	Not included for the RANKED_TFT_TURBO queueType.
  miniSeries: RiotMiniSeriesDto; //	Not included for the RANKED_TFT_TURBO queueType.
};
