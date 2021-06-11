import { Loader } from './Loader';

export class ExpiredCacheLoader<T> implements Loader<T> {
  private cache: T | null = null;
  private nextExpires: number = 0;
  private expires;
  private loader: Loader<T>;

  public constructor(loader: Loader<T>, expires: number) {
    this.loader = loader;
    this.expires = expires;
  }

  public async load(): Promise<T> {
    const timestamp = new Date().getTime();
    if (this.cache === null || timestamp >= this.nextExpires) {
      this.cache = await this.loader.load();
      this.nextExpires = timestamp + this.expires;
    }
    return this.cache;
  }
}
