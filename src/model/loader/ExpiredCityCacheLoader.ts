import { cityLoader } from "./cityLoader";


export class ExpiredCityCacheLoader<T> implements cityLoader<T> {
  #nextExpires: {time: number, city: string, cache: T}[] = [];
  #loader: cityLoader<T>
  #expires;

  constructor(loader: cityLoader<T>, time: number) {
    this.#loader = loader;
    this.#expires = time;
  }

  async load(city: string): Promise<T> {
    const timestamp = new Date().getTime();
    const findExpires = this.#nextExpires.find((Expires) => Expires.city === city);

    if (!findExpires || findExpires.time < timestamp) {
      const weatherResults = await this.#loader.load(city);  
      this.#nextExpires = this.#nextExpires.concat([{
        city,
        time: this.#expires + timestamp,
        cache: weatherResults
      }]);
      return weatherResults;
    }
    return findExpires.cache;
  }
}