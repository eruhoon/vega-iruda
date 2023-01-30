import { Bot } from '../../framework/bot/Bot';
import { BojRule } from '../rule/BojRule';
import { HelpRule } from '../rule/HelpRule';
import { LoLSchessSearchRule } from '../rule/LoLSchessSearchRule';
import { LolUserRule } from '../rule/LolUserRule';
import { MapleEventRule } from '../rule/MapleEventRule';
import { TwitchRule } from '../rule/TwitchRule';

export class IrudaBot extends Bot {
  constructor() {
    super([
      new HelpRule(),
      new MapleEventRule(),
      new TwitchRule(),
      new BojRule(),
      new LoLSchessSearchRule(),
      new LolUserRule(),
    ]);
  }
}
