import axios from 'axios';
import * as https from 'https';

export class OnnadaAnimationLoader {
  async load(input: string): Promise<AnimationLoaderResult | null> {
    const uri = OnnadaAnimationLoader.getUri(input);
    const res = await axios.get(uri, {
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });
    if (res.status !== 200) {
      return null;
    }

    const jsonStatementRegex = /var ONNADA = (.*)?;/;
    const match = jsonStatementRegex.exec(res.data);
    if (!match || !match[1]) {
      return null;
    }
    const json = JSON.parse(match[1]);
    const entries: OnanadaAnimationInfo[] = json.result.items || [];
    const results: AnimationLoaderResult[] = entries.map((e) => {
      return {
        title: e.title,
        link: e.uri,
        thumbnail: e.thumb,
        media: '',
        genre: '',
        date: e.date,
      };
    });

    const toKeyword = (s: string) => s.toLowerCase().replace(/\s+/g, '');
    const keyword = toKeyword(input);
    let result = results.find((e) => toKeyword(e.title) === keyword);
    if (!result) {
      result = results.find((e) => toKeyword(e.title).search(keyword) >= 0);
    }
    if (!result) {
      return results[0];
    }
    return result;
  }

  static getUri(animationName: string): string {
    const params = new URLSearchParams();
    params.set('q', animationName);
    const host = 'https://onnada.com/anime/search';
    return `${host}?${params.toString()}`;
  }
}

type OnanadaAnimationInfo = {
  id: number;
  uri: string;
  thumb: string;
  category: string;
  title: string;
  date: string;
};
