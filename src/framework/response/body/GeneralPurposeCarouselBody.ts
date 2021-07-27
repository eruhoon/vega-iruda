import { GeneralPurposeCardBodyOption } from './GeneralPurposeCardBody';
import { ResponseBody } from './ReponseBody';

export class GeneralPurposeCarouselBody implements ResponseBody {
  readonly #DEFAULT_ICON = 'https://mycast.xyz/assets/image/login/logo-300.png';
  readonly #DEFAULT_TITLE = 'Untitled';
  readonly #DEFAULT_ORIENTATION = 'vertical';

  #options: GeneralPurposeCardBodyOption[];

  constructor(options: GeneralPurposeCardBodyOption[]) {
    this.#options = options.map((option) => {
      const link = option.link || '';
      const title = option.title || this.#DEFAULT_TITLE;
      const icon = option.icon || this.#DEFAULT_ICON;
      const subtitle = option.subtitle || '';
      const showType = option.showType || 'in-app-browser';
      const orientation = option.orientation || this.#DEFAULT_ORIENTATION;
      return { link, title, icon, subtitle, showType, orientation };
    });
  }

  serialize(): string {
    return JSON.stringify(this.#options);
  }
}
