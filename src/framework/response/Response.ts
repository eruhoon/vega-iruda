import { ResponseBody } from './body/ReponseBody';
import { ResponseType } from './ResponseType';

export abstract class Response {
  private mType: ResponseType;
  private mBody: ResponseBody;

  public constructor(type: ResponseType, body: ResponseBody) {
    this.mType = type;
    this.mBody = body;
  }

  public serialize(): string {
    return JSON.stringify({
      type: this.mType,
      body: this.mBody.serialize(),
    });
  }
}
