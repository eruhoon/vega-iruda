import { TextRule } from '../../framework/rule/TextRule';

export class PollenRule implements TextRule {
  public match(src: string): boolean {
    return src == '!꽃가루';
  }

  public async makeMessage(src: string): Promise<string> {
    return 'https://www.weather.go.kr/weather/lifenindustry/life_jisu.jsp?JISU_INFO=jisudaymap_D06';
  }
}
