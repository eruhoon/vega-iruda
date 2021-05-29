import { TextRule } from '../../framework/rule/TextRule';

export class CharacterSearchRule implements TextRule {
  public match(src: string): boolean {
    return src.startsWith('!캐릭 ');
  }

  public async makeMessage(src: string): Promise<string> {
    const match = /!캐릭 (.*)/.exec(src);
    const word = match ? match[1] : '';
    return `https://onnada.com/character/search?q=${word}`;
  }
}
