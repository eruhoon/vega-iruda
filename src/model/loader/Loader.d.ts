export interface Loader<T> {
  load(): Promise<T>;
}
