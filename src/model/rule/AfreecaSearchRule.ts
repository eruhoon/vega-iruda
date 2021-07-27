import { GeneralPurposeCarouselResponse } from '../../framework/response/GeneralPurposeCarouselResponse';
import { Response } from '../../framework/response/Response';
import { AfreecaSearchLoader } from '../loader/afreeca/AfreecaSearchLoader';
import { ArgumentRuleTemplate } from './ArgumentRuleTemplate';

export class AfreecaSearchRule extends ArgumentRuleTemplate {
  #loader = new AfreecaSearchLoader();

  constructor() {
    super('아프리카');
  }

  protected async makeMessageWithArg(arg: string): Promise<Response> {
    console.log(arg);
    const query = arg;
    const results = await this.#loader.getResults(query);
    const options = results.map((result) => {
      const link = `//play.afreecatv.com/${result.id}/embed`;
      return {
        icon: result.broadIcon,
        link,
        newWindow: false,
        title: result.stationName,
        subtitle: result.broadTitle,
      };
    });
    return new GeneralPurposeCarouselResponse(options);
  }
}
