import { DataDragonRealms } from '../../../../lib/riot/data-dragon/DataDragonRealms';

export class LolStaticLoader {
  readonly #EXPIRY_TERM = 24 * 60 * 60 * 1000;

  #expiredDate: number = -1;
  #staticApi = new DataDragonRealms();
  #cdnHost: string = 'http://ddragon.leagueoflegends.com/cdn';
  #profileIconVersion: string = '11.24.1';

  async getProfileIcon(profileIconId: number): Promise<string> {
    await this.refresh();
    const host = this.#cdnHost;
    const dir = `${this.#profileIconVersion}/img/profileicon`;
    const file = `${profileIconId}.png`;
    return `${host}/${dir}/${file}`;
  }

  async refresh(): Promise<boolean> {
    const now = new Date().getTime();
    if (now < this.#expiredDate) {
      return true;
    }

    const result = await this.#staticApi.load();
    if (!result) {
      return false;
    }

    this.#cdnHost = result.cdn;
    this.#profileIconVersion = result.n.profileicon;

    this.#expiredDate = now + this.#EXPIRY_TERM;
    return true;
  }
}
