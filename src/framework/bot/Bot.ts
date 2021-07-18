import { TextRule } from '../rule/TextRule';

export class Bot {
  #rules: TextRule[];

  public constructor(rules: TextRule[]) {
    this.#rules = rules;
  }

  public async process(src: string): Promise<string | null> {
    const matched = this.#rules.find((rule) => rule.match(src));
    return matched ? (await matched.makeMessage(src)).serialize() : null;
  }
}
