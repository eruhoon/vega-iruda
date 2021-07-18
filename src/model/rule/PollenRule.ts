import { Response } from '../../framework/response/Response';
import { TextResponse } from '../../framework/response/TextReponse';
import { TextRule } from '../../framework/rule/TextRule';

export class PollenRule extends TextRule {
  match(src: string): boolean {
    return src === '!꽃가루';
  }

  async makeMessage(src: string): Promise<Response> {
    return new TextResponse(
      'https://www.weather.go.kr/weather/lifenindustry/life_jisu.jsp?JISU_INFO=jisudaymap_D06'
    );
  }
}
