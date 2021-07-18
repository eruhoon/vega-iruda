import { GeneralPurposeCarouselResponse } from '../../framework/response/GeneralPurposeCarouselResponse';
import { Response } from '../../framework/response/Response';
import { TextResponse } from '../../framework/response/TextReponse';
import { TextRule } from '../../framework/rule/TextRule';
import { LolScheduleLoader } from '../loader/lol/schedule/LolScheduleLoader';

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
      return new TextResponse(
        'https://lolesports.com/schedule?leagues=lck,worlds'
      );
    }
    return new GeneralPurposeCarouselResponse(
      found.schedules.map((s) => {
        const home = s[0];
        const away = s[1];
        const subtitle = `${home} vs ${away}`;
        return {
          icon: 'https://am-a.akamaihd.net/image?resize=60:&f=http%3A%2F%2Fstatic.lolesports.com%2Fleagues%2Flck-color-on-black.png',
          title: 'LCK',
          subtitle,
          link: 'https://lolesports.com/schedule?leagues=lck,worlds',
        };
      })
    );
  }

  async #load(): Promise<Schedule> {
    const loaded = await new LolScheduleLoader().load();
    const today = this.#formatDate(new Date());
    const schedules: [string, string][] = loaded
      .filter((e) => {
        return today === this.#formatDate(new Date(e.startTime));
      })
      .map((e) => {
        const teams = e.match.teams.map((t) => t.code);
        return [teams[0], teams[1]];
      });
    return { date: today, schedules };
  }

  #formatDate(dateObj: Date): string {
    const format = (src: number) => (src < 10 ? `0${src}` : `${src}`);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const date = dateObj.getDate();
    return `${year}-${format(month)}-${format(date)}`;
  }
}

type Schedule = {
  date: string;
  schedules: [string, string][];
};
