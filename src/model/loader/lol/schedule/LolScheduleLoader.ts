import axios from 'axios';

export class LolScheduleLoader {
  async load(): Promise<Event[]> {
    const host = 'https://esports-api.lolesports.com/persisted/gw/getSchedule';
    const leagueId = '98767991310872058%2C98767991335774713';
    const query = `hl=ko-KR&leagueId=${leagueId}`;
    const url = `${host}?${query}`;
    const headers = { 'x-api-key': '0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z' };
    const { data } = await axios.get(url, { headers });
    const events: Event[] = data.data.schedule.events || [];
    return events;
  }
}

type Event = {
  startTime: string;
  state: 'unstarted' | 'in progress' | 'completed';
  league: League;
  match: Match;
};

type League = {
  name: string;
  slug: string;
};

type Match = {
  id: string;
  teams: Team[];
};

type Team = {
  name: string;
  code: string;
  image: string;
};
