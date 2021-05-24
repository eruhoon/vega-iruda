import { Bot } from '../../framework/bot/Bot';
import { HelpRule } from '../rule/HelpRule';

export class IrudaBot extends Bot {
  public constructor() {
    super([new HelpRule()]);
  }
}
