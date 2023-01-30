import { Bot } from '../../framework/bot/Bot';
import { HelpRule } from '../rule/HelpRule';
import { LoLSchessSearchRule } from '../rule/LoLSchessSearchRule';
import { LolUserRule } from '../rule/LolUserRule';

export class IrudaBot extends Bot {
  constructor() {
    super([new HelpRule(), new LoLSchessSearchRule(), new LolUserRule()]);
  }
}
