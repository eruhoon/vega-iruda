import { Observer } from './Observer';

export abstract class Observable<T> {
  private mObservers: Observer<T>[] = [];

  public addObserver(observer: Observer<T>): void {
    if (!this.mObservers.find((o) => o === observer)) {
      this.mObservers.push(observer);
    }
  }

  public removeObserver(observer: Observer<T>): void {
    this.mObservers = this.mObservers.filter((o) => o !== observer);
  }

  public notify(value: T): void {
    this.mObservers.forEach((o) => o.onObserve(value));
  }
}
