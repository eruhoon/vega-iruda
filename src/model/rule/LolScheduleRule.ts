import { GeneralPurposeCarouselResponse } from '../../framework/response/GeneralPurposeCarouselResponse';
import { Response } from '../../framework/response/Response';
import { TextResponse } from '../../framework/response/TextReponse';
import { TextRule } from '../../framework/rule/TextRule';

export class LolScheduleRule extends TextRule {
  public match(src: string): boolean {
    return (
      src == '!롤일정' ||
      src == '!lck' ||
      src == '!LCK' ||
      src == '!롤드컵' ||
      src == '!월즈'
    );
  }

  public async makeMessage(src: string): Promise<Response> {
    const date = new Date();
    const ONE_DAY = 24 * 60 * 60 * 1000;
    const today = date.getTime() - (date.getTime() % ONE_DAY);
    const found = this.schedules.find((s) => {
      const timestamp = new Date(s.date).getTime();
      return today === timestamp;
    });

    if (!found) {
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

  private leagues: string[] = [
    'https://am-a.akamaihd.net/image?resize=60:&f=http%3A%2F%2Fstatic.lolesports.com%2Fleagues%2Flck-color-on-black.png',
    'https://am-a.akamaihd.net/image?resize=60:&f=http%3A%2F%2Fstatic.lolesports.com%2Fleagues%2Flck-cl-white.png',
  ];

  private schedules: Schedule[] = [
    {
      date: '2021-06-19',
      schedules: [
        ['DK', 'DRX'],
        ['KT', 'AF'],
      ],
    },
    {
      date: '2021-06-20',
      schedules: [
        ['LSB', 'T1'],
        ['BRO', 'HLE'],
      ],
    },

    {
      date: '2021-06-23',
      schedules: [
        ['HLE', 'AF'],
        ['DK', 'BRO'],
      ],
    },
    {
      date: '2021-06-24',
      schedules: [
        ['GEN', 'LSB'],
        ['T1', 'NS'],
      ],
    },
    {
      date: '2021-06-25',
      schedules: [
        ['KT', 'DRX'],
        ['DK', 'HLE'],
      ],
    },
    {
      date: '2021-06-26',
      schedules: [
        ['AF', 'GEN'],
        ['NS', 'BRO'],
      ],
    },
    {
      date: '2021-06-27',
      schedules: [
        ['DRX', 'T1'],
        ['KT', 'LSB'],
      ],
    },
    {
      date: '2021-06-30',
      schedules: [
        ['T1', 'KT'],
        ['BRO', 'GEN'],
      ],
    },

    {
      date: '2021-07-01',
      schedules: [
        ['HLE', 'DRX'],
        ['AF', 'LSB'],
      ],
    },
    {
      date: '2021-07-02',
      schedules: [
        ['NS', 'DK'],
        ['BRO', 'KT'],
      ],
    },
    {
      date: '2021-07-03',
      schedules: [
        ['T1', 'AF'],
        ['LSB', 'DRX'],
      ],
    },
    {
      date: '2021-07-04',
      schedules: [
        ['HLE', 'NS'],
        ['DK', 'GEN'],
      ],
    },

    {
      date: '2021-07-07',
      schedules: [
        ['LSB', 'DK'],
        ['AF', 'NS'],
      ],
    },
    {
      date: '2021-07-08',
      schedules: [
        ['KT', 'HLE'],
        ['DRX', 'BRO'],
      ],
    },
    {
      date: '2021-07-09',
      schedules: [
        ['GEN', 'T1'],
        ['LSB', 'AF'],
      ],
    },
    {
      date: '2021-07-10',
      schedules: [
        ['KT', 'BRO'],
        ['HLE', 'DK'],
      ],
    },
  ];

  private teams: LolTeam[] = [
    {
      name: 'KT',
      icon: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FNSFullonDark.png',
    },
    {
      name: 'T1',
      icon: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1592589079394_T1T1-01-FullonDark.png',
    },
    {
      name: 'LSB',
      icon: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2Fliiv-sandbox-new.png',
    },
    {
      name: 'HLE',
      icon: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2Fhle-2021-color-on-dark.png',
    },
    {
      name: 'BRO',
      icon: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FBRO_color_darkbackground.png',
    },
    {
      name: 'DK',
      icon: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FDK-FullonDark.png',
    },
    {
      name: 'DRX',
      icon: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1592589284897_DRXDRX-01-FullonDark.png',
    },
    {
      name: 'GEN',
      icon: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1592589327622_Gen.GGEN-01-FullonDark.png',
    },
    {
      name: 'NS',
      icon: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FNSFullonDark.png',
    },
    {
      name: 'AF',
      icon: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FAF-FullonDark.png',
    },
  ];
}

type LolTeam = {
  icon: string;
  name: string;
};

type Schedule = {
  date: string;
  schedules: [string, string][];
};
