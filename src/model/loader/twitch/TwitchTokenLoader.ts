import Axios from 'axios';
import * as qs from 'querystring';

export class TwitchTokenLoader {
  readonly #clientId: string;
  readonly #secretKey: string;

  constructor(clientId: string, secretKey: string) {
    this.#clientId = clientId;
    this.#secretKey = secretKey;
  }

  async load(): Promise<string | null> {
    const host = 'https://id.twitch.tv/oauth2/token';
    const query = qs.stringify({
      client_id: this.#clientId,
      client_secret: this.#secretKey,
      grant_type: 'client_credentials',
      scope: 'user:read:email',
    });
    const url = `${host}?${query}`;
    try {
      const { data } = await Axios.post(url);
      return data.access_token;
    } catch (e) {
      return null;
    }
  }
}
