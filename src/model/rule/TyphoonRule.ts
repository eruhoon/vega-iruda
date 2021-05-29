import { TextRule } from '../../framework/rule/TextRule';

export class TyphoonRule implements TextRule {
  public match(src: string): boolean {
    return src == '!태풍';
  }

  public async makeMessage(src: string): Promise<string> {
    return 'https://earth.nullschool.net/ko/#current/wind/surface/level/overlay=total_cloud_water/orthographic=-228.58,29.11,1089';
  }
}
