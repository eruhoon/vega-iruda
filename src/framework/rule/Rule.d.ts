import { Response } from '../response/Response';

export interface Rule<Source> {
  match(src: Srouce): boolean;
  makeMessage(src: Source): Promise<Response>;
}
