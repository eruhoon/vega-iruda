import { GeneralPurposeCardBodyOption } from './body/GeneralPurposeCardBody';
import { GeneralPurposeCarouselBody } from './body/GeneralPurposeCarouselBody';
import { Response } from './Response';

export class GeneralPurposeCarouselResponse extends Response {
  constructor(options: GeneralPurposeCardBodyOption[]) {
    super('general-purpose-carousel', new GeneralPurposeCarouselBody(options));
  }
}
