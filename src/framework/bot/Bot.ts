import { TextRule } from '../rule/TextRule';

export class Bot {
  private mRules: TextRule[];

  public constructor(rules: TextRule[]) {
    this.mRules = rules;
  }

  public async process(src: string): Promise<string | null> {
    const matched = this.mRules.find((rule) => rule.match(src));
    return matched ? (await matched.makeMessage(src)).serialize() : null;
  }
}
