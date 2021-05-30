import { ResponseBody } from './ReponseBody';

export class TextBody implements ResponseBody {
  private mText: string;

  public constructor(text: string) {
    this.mText = text;
  }

  public serialize(): string {
    return this.mText;
  }
}
