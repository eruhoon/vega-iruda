import { GeneralPurposeCardBodyOption } from './GeneralPurposeCardBody';
import { ResponseBody } from './ReponseBody';

export class GeneralPurposeCarouselBody implements ResponseBody {
  private readonly DEFAULT_ICON =
    'https://mycast.xyz/assets/image/login/logo-300.png';
  private readonly DEFAULT_TITLE = 'Untitled';

  private options: GeneralPurposeCardBodyOption[];

  public constructor(options: GeneralPurposeCardBodyOption[]) {
    this.options = options.map((option) => {
      const link = option.link || '';
      const title = option.title || this.DEFAULT_TITLE;
      const icon = option.icon || this.DEFAULT_ICON;
      const subtitle = option.subtitle || '';
      const newWindow = option.newWindow || false;
      return { link, title, icon, subtitle, newWindow };
    });
  }

  public serialize(): string {
    return JSON.stringify(this.options);
  }
}
