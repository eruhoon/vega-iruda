import axios from 'axios';
import { Config } from '../../../Config';

export class NaverMovieLoader {
  static readonly #CLIENT_ID = Config.getNaverClientID();
  static readonly #CLIENT_SECRET = Config.getNaverClientSecret();
  static readonly #API_URI = 'https://openapi.naver.com/v1/search/movie.json';

  static #findResult(
    items: NaverMovieItem[],
    keyword: string
  ): NaverMovieItem | null {
    const keywordize = (s: string) => s.replace(/[\s]+/g, '');
    const fullMatch = (item: NaverMovieItem) => {
      return keywordize(item.title) === keywordize(keyword);
    };
    const partMatch = (item: NaverMovieItem) => {
      return keywordize(item.title).includes(keywordize(keyword));
    };

    if (items.length === 0) {
      return null;
    }

    const sorted = items.sort((i1, i2) => {
      return parseFloat(i2.userRating) - parseFloat(i1.userRating);
    });

    const equal = sorted.find((item) => item.title === keyword);
    if (equal) {
      return equal;
    }

    const fullMatched = sorted.find((item) => fullMatch(item));
    if (fullMatched) {
      return fullMatched;
    }

    const partMatched = items.find((item) => partMatch(item));
    if (partMatched) {
      return partMatched;
    }

    return items[0];
  }

  async getData(query: string | null): Promise<MovieData | null> {
    const opt = {
      headers: {
        'X-Naver-Client-Id': NaverMovieLoader.#CLIENT_ID,
        'X-Naver-Client-Secret': NaverMovieLoader.#CLIENT_SECRET,
      },
      timeout: 5000,
    };
    if (query === null) {
      return null;
    }
    const res = await axios.get(this.#getUri(query), opt);
    if (res.status !== 200 || !res.data) {
      return null;
    }
    const rawData: NaverMovieData = res.data as NaverMovieData;
    if (rawData.total === 0) {
      return null;
    }
    const rawMovies = rawData.items.map((item) => {
      item.title = item.title.replace(/<\/?b>/g, '').trim();
      return item;
    });
    const raw = NaverMovieLoader.#findResult(rawMovies, query);
    if (raw === null) {
      return null;
    }
    const result: MovieData = {
      actor: raw.director.split('|'),
      director: raw.director.split('|'),
      image: raw.image,
      link: raw.link,
      pubDate: raw.pubDate,
      rate: raw.userRating,
      title: raw.title.replace(/<.*?>/g, ''),
    };
    return result;
  }

  #getUri(query: string): string {
    const params = new URLSearchParams();
    params.set('query', query);
    params.set('display', '20');
    return `${NaverMovieLoader.#API_URI}?${params.toString()}`;
  }
}

type NaverMovieData = {
  lastBuildDate: string;
  total: number;
  start: number;
  display: number;
  items: NaverMovieItem[];
};

type NaverMovieItem = {
  title: string;
  link: string;
  image: string;
  subtitle: string;
  pubDate: string;
  director: string;
  actor: string;
  userRating: string;
};

type MovieData = {
  actor: string[];
  director: string[];
  image: string;
  link: string;
  pubDate: string;
  rate: string;
  title: string;
};
