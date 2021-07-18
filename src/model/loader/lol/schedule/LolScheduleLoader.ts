import axios from 'axios';

export class LolScheduleLoader {
  async load(): Promise<Event[]> {
    const url =
      'https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=ko-KR&leagueId=98767991310872058%2C98767991335774713';
    const { data } = await axios.get(url, {
      headers: { 'x-api-key': '0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z' },
    });
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
