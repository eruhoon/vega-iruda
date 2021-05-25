import { Bot } from '../../framework/bot/Bot';
import { HelpRule } from '../rule/HelpRule';
import { NamuWikiRule } from '../rule/NamuWikiRule';
import { SearchRule } from '../rule/SearchRule';

export class IrudaBot extends Bot {
  public constructor() {
    super([new HelpRule(), new NamuWikiRule(), new SearchRule()]);
  }
}
