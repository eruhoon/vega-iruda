import { GeneralPurposeCardBody } from './body/GeneralPurposeCardBody';
import { Response } from './Response';
import { ResponseType } from './ResponseType';

export class GeneralPurposeCardResponse extends Response {
  public constructor(body: GeneralPurposeCardBody) {
    super(ResponseType.GENERAL_PURPOSE_CARD, body);
  }
}
