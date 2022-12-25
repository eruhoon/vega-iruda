export interface ArgumentLoader<P, R> {
  load(param: P): Promise<R>;
}
