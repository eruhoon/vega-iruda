import { GeneralPurposeCardBodyOption } from './GeneralPurposeCardBody';
import { ResponseBody } from './ReponseBody';

export class GeneralPurposeCarouselBody implements ResponseBody {
  readonly #DEFAULT_ICON = 'https://mycast.xyz/assets/image/login/logo-300.png';
  readonly #DEFAULT_TITLE = 'Untitled';
  readonly #DEFAULT_ORIENTATION = 'vertical';

  #options: GeneralPurposeCardBodyOption[];

  public constructor(options: GeneralPurposeCardBodyOption[]) {
    this.#options = options.map((option) => {
      const link = option.link || '';
      const title = option.title || this.#DEFAULT_TITLE;
      const icon = option.icon || this.#DEFAULT_ICON;
      const subtitle = option.subtitle || '';
      const newWindow = option.newWindow || false;
      const orientation = option.orientation || this.#DEFAULT_ORIENTATION;
      return { link, title, icon, subtitle, newWindow, orientation };
    });
  }

  public serialize(): string {
    return JSON.stringify(this.#options);
  }
}
