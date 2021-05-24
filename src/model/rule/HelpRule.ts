import { TextRule } from '../../framework/rule/TextRule';

export class HelpRule implements TextRule {
  public match(src: string): boolean {
    return src == '!도움';
  }

  public async makeMessage(src: string): Promise<string> {
    return '-목록- !캐릭 [이름] / !검색 [검색어] / !꺼라 [검색어] / !랜덤 [숫자] / !백준(,코딩, 문제) [문제번호] / !롤일정 / !태풍 / !미먼 / !꽃가루 / !명방 / !모바일 / !? [닉, 레벨] / !?? [닉, 레벨]';
  }
}
