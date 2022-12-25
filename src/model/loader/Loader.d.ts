export interface Loader<T> {
  load(city?: string): Promise<T>;
}
