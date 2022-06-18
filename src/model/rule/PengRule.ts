import { GeneralPurposeCardResponse } from '../../framework/response/GeneralPurposeCardResponse';
import { Response } from '../../framework/response/Response';
import { TextRule } from '../../framework/rule/TextRule';

export class PengRule extends TextRule {
  match(src: string): boolean {
    return src === "!펭" || src === "!vpd";
  }
  async makeMessage(src: string): Promise<Response> {
    return new GeneralPurposeCardResponse({
      title: "이봐 펭 ㅋㅋㅋ",
      subtitle: `이보세요 펭님 ㅋㅋㅋ`,
      icon: "https://i.imgur.com/jzcX4I6.png",
    });
  }
}
