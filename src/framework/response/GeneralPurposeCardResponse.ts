import {
  GeneralPurposeCardBody,
  GeneralPurposeCardBodyOption,
} from './body/GeneralPurposeCardBody';
import { Response } from './Response';

export class GeneralPurposeCardResponse extends Response {
  constructor(option: GeneralPurposeCardBodyOption) {
    super('general-purpose-card', new GeneralPurposeCardBody(option));
  }
}
