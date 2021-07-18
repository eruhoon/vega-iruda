import { ResponseBody } from './body/ReponseBody';
import { ResponseType } from './ResponseType';

export abstract class Response {
  #type: ResponseType;
  #body: ResponseBody;

  constructor(type: ResponseType, body: ResponseBody) {
    this.#type = type;
    this.#body = body;
  }

  serialize(): string {
    return JSON.stringify({
      type: this.#type,
      body: this.#body.serialize(),
    });
  }
}
