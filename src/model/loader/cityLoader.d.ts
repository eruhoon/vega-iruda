export interface cityLoader<T> {
  load(city: string): Promise<T>;
}