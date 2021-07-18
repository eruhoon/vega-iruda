import { TextRule } from '../rule/TextRule';

export class Bot {
  #rules: TextRule[];

  constructor(rules: TextRule[]) {
    this.#rules = rules;
  }

  async process(src: string): Promise<string | null> {
    const escaped = this.#escapeRegex(src);
    const matched = this.#rules.find((rule) => rule.match(escaped));
    return matched ? (await matched.makeMessage(src)).serialize() : null;
  }

  #escapeRegex(src: string) {
    return src.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  }
}
