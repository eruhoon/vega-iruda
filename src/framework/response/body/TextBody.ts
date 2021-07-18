import { ResponseBody } from './ReponseBody';

export class TextBody implements ResponseBody {
  #text: string;

  constructor(text: string) {
    this.#text = text;
  }

  serialize(): string {
    return this.#text;
  }
}
