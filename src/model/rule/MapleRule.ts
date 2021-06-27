import axios from 'axios';
import Cheerio from 'cheerio';
import { GeneralPurposeCardResponse } from '../../framework/response/GeneralPurposeCardResponse';
import { Response } from '../../framework/response/Response';
import { TextResponse } from '../../framework/response/TextReponse';
import { ArgumentRuleTemplate } from './ArgumentRuleTemplate';

export class MapleRule extends ArgumentRuleTemplate {
  public constructor() {
    super('메이플');
  }

  protected async makeMessageWithArg(arg: string): Promise<Response> {
    const id = arg;
    const mainUser = await this.loadUser(id, false);
    if (mainUser !== null) {
      return this.createResponse(mainUser);
    }

    const rebootUser = await this.loadUser(id, true);
    if (rebootUser !== null) {
      return this.createResponse(rebootUser);
    }

    return new TextResponse('검색 실패');
  }

  private createResponse(user: MapleUser): GeneralPurposeCardResponse {
    return new GeneralPurposeCardResponse({
      link: user.link,
      title: user.name,
      icon: user.icon,
      subtitle: `${user.level} ${user.jobClass}`,
      orientation: 'vertical',
    });
  }

  private async loadUser(
    id: string,
    reboot: boolean
  ): Promise<MapleUser | null> {
    const body = await this.getBody(id, reboot);
    if (!body) {
      return null;
    }
    const user = this.parseContent(body);
    return user;
  }

  private async getBody(id: string, reboot: boolean): Promise<string | null> {
    const HOST = 'https://maplestory.nexon.com';
    const DIR = 'Ranking/World/Total';
    const SERVER_REBOOT = 254;
    const SERVER_MAIN = 0;

    const encodedId = encodeURIComponent(id);
    const server = reboot ? SERVER_REBOOT : SERVER_MAIN;
    const uri = `${HOST}/${DIR}?c=${encodedId}&w=${server}`;
    const { data: body } = await axios.get(uri);
    return body;
  }

  private parseContent(body: string): MapleUser | null {
    const LINK_HOST = 'https://maplestory.nexon.com';
    const $ = Cheerio.load(body, { normalizeWhitespace: true });
    const $user = $('.search_com_chk');
    if ($user.length === 0) {
      return null;
    }
    const $icon = $user.find('span.char_img img').eq(0);
    const $link = $user.find('dl a');
    const link = `${LINK_HOST}${$link.attr('href') || ''}`;
    const name = $link.text();
    const icon = $icon.attr('src') || '';
    const jobClass = $user
      .find('dd')
      .text()
      .replace(/.*\/\s*/, '');
    const level = $user.find('td').eq(2).text();
    const server = $user.find('dt img').attr('src') || '';
    return {
      icon,
      name,
      server,
      link,
      jobClass,
      level,
    };
  }
}

type MapleUser = {
  icon: string;
  name: string;
  server: string;
  link: string;
  jobClass: string;
  level: string;
};
