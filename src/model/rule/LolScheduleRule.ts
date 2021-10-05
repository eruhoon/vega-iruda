import { GeneralPurposeCarouselResponse } from '../../framework/response/GeneralPurposeCarouselResponse';
import { Response } from '../../framework/response/Response';
import { TextResponse } from '../../framework/response/TextReponse';
import { TextRule } from '../../framework/rule/TextRule';
import { LolScheduleLoader } from '../loader/lol/schedule/LolScheduleLoader';

const LOL_SCHEDULE_URL = 'https://lolesports.com/schedule?leagues=lck,worlds';

export class LolScheduleRule extends TextRule {
  match(src: string): boolean {
    return (
      src === '!롤일정' ||
      src === '!lck' ||
      src === '!LCK' ||
      src === '!롤드컵' ||
      src === '!월즈'
    );
  }

  async makeMessage(src: string): Promise<Response> {
    const found = await this.#load();
    if (!found || found.schedules.length === 0) {
      return new TextResponse(LOL_SCHEDULE_URL);
    }
    return new GeneralPurposeCarouselResponse(
      found.schedules.map((s) => {
        const league = s[0];
        const home = s[1];
        const away = s[2];
        return {
          icon: this.#getIcon(league),
          title: this.#getName(league),
          subtitle: `${home} vs ${away}`,
          link: LOL_SCHEDULE_URL,
        };
      })
    );
  }

  async #load(): Promise<Schedule> {
    const loaded = await new LolScheduleLoader().load();
    const today = this.#formatDate(new Date());
    const schedules: [League, string, string][] = loaded
      .filter((e) => {
        const isLck =
          e.league.slug === 'lck' || 'lck_challengers_league' || 'worlds';
        const isToday = today === this.#formatDate(new Date(e.startTime));
        return isLck && isToday;
      })
      .map((e) => {
        const league = this.#getLeagueName(e.league.slug);
        const teams = e.match.teams.map((t) => t.code);
        return [league, teams[0], teams[1]];
      });
    return { date: today, schedules };
  }

  #getLeagueName(slug: string) {
    switch (slug) {
      case 'lck':
      case 'worlds':
      case 'lck cl':
        return slug;
      default:
        return 'etc';
    }
  }

  #formatDate(dateObj: Date): string {
    const format = (src: number) => (src < 10 ? `0${src}` : `${src}`);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const date = dateObj.getDate();
    return `${year}-${format(month)}-${format(date)}`;
  }

  #getIcon(league: League): string {
    switch (league) {
      case 'lck':
        return 'https://am-a.akamaihd.net/image?resize=60:&f=http%3A%2F%2Fstatic.lolesports.com%2Fleagues%2Flck-color-on-black.png';
      case 'lck cl':
        return 'https://am-a.akamaihd.net/image?resize=120:&f=http%3A%2F%2Fstatic.lolesports.com%2Fleagues%2Flck-cl-white.png';
      default:
        console.log('invalid league');
        return '';
    }
  }

  #getName(league: League): string {
    switch (league) {
      case 'lck':
        return 'LCK';
      case 'lck cl':
        return 'LCK CL';
      case 'worlds':
        return 'Worlds';
      default:
        console.log('invalid league');
        return '';
    }
  }
}

type Schedule = {
  date: string;
  schedules: [League, string, string][];
};

type League = 'lck' | 'lck cl' | 'worlds' | 'etc';
