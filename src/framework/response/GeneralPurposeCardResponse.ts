import {
  GeneralPurposeCardBody,
  GeneralPurposeCardBodyOption,
} from './body/GeneralPurposeCardBody';
import { Response } from './Response';
import { ResponseType } from './ResponseType';

export class GeneralPurposeCardResponse extends Response {
  constructor(option: GeneralPurposeCardBodyOption) {
    super(
      ResponseType.GENERAL_PURPOSE_CARD,
      new GeneralPurposeCardBody(option)
    );
  }
}
