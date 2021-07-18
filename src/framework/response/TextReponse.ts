import { TextBody } from './body/TextBody';
import { Response } from './Response';
import { ResponseType } from './ResponseType';

export class TextResponse extends Response {
  constructor(text: string) {
    super('text', new TextBody(text));
  }
}
