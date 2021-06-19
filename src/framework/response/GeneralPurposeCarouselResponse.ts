import { GeneralPurposeCardBodyOption } from './body/GeneralPurposeCardBody';
import { GeneralPurposeCarouselBody } from './body/GeneralPurposeCarouselBody';
import { Response } from './Response';
import { ResponseType } from './ResponseType';

export class GeneralPurposeCarouselResponse extends Response {
  public constructor(options: GeneralPurposeCardBodyOption[]) {
    super(
      ResponseType.GENERAL_PURPOSE_CAROUSEL,
      new GeneralPurposeCarouselBody(options)
    );
  }
}
