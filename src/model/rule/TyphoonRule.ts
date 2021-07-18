import { Response } from '../../framework/response/Response';
import { TextResponse } from '../../framework/response/TextReponse';
import { TextRule } from '../../framework/rule/TextRule';

export class TyphoonRule extends TextRule {
  match(src: string): boolean {
    return src === '!태풍';
  }

  async makeMessage(src: string): Promise<Response> {
    return new TextResponse(
      'https://earth.nullschool.net/ko/#current/wind/surface/level/overlay=total_cloud_water/orthographic=-228.58,29.11,1089'
    );
  }
}
