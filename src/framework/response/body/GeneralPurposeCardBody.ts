import { ResponseBody } from './ReponseBody';

export class GeneralPurposeCardBody implements ResponseBody {
  private readonly DEFAULT_ICON =
    'https://mycast.xyz/assets/image/login/logo-300.png';
  private readonly DEFAULT_TITLE = 'Untitled';
  private readonly DEFAULT_ORIENTATION = 'horizontal';

  private mLink: string;
  private mIcon: string;
  private mTitle: string;
  private mSubtitle: string;
  private mNewWindow: boolean;
  private mOrientation: OrienationOption;

  public constructor(option: GeneralPurposeCardBodyOption) {
    this.mLink = option.link || '';
    this.mTitle = option.title || this.DEFAULT_TITLE;
    this.mIcon = option.icon || this.DEFAULT_ICON;
    this.mSubtitle = option.subtitle || '';
    this.mNewWindow = option.newWindow || false;
    this.mOrientation = option.orientation || this.DEFAULT_ORIENTATION;
  }

  public serialize(): string {
    return JSON.stringify({
      link: this.mLink,
      icon: this.mIcon,
      title: this.mTitle,
      subtitle: this.mSubtitle,
      newWindow: this.mNewWindow,
      orientation: this.mOrientation,
    });
  }
}

export type GeneralPurposeCardBodyOption = {
  link?: string;
  title?: string;
  icon?: string;
  subtitle?: string;
  newWindow?: boolean;
  orientation?: OrienationOption;
};

export type OrienationOption = 'horizontal' | 'vertical';
