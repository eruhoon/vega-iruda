import { ResponseBody } from './ReponseBody';

export class GeneralPurposeCardBody implements ResponseBody {
  private mLink: string;
  private mIcon: string;
  private mTitle: string;
  private mSubtitle: string;
  private mNewWindow: boolean;

  public constructor(
    link: string,
    title: string,
    icon: string,
    subtitle: string,
    newWindow: boolean
  ) {
    this.mLink = link;
    this.mTitle = title;
    this.mIcon = icon;
    this.mSubtitle = subtitle;
    this.mNewWindow = newWindow;
  }

  public serialize(): string {
    return JSON.stringify({
      link: this.mLink,
      icon: this.mIcon,
      title: this.mTitle,
      subtitle: this.mSubtitle,
      newWindow: this.mNewWindow,
    });
  }
}
