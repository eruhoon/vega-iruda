import { ResponseBody } from './ReponseBody';

export class TextBody implements ResponseBody {
  #text: string;

  public constructor(text: string) {
    this.#text = text;
  }

  public serialize(): string {
    return this.#text;
  }
}
