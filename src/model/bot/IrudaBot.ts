import { Bot } from '../../framework/bot/Bot';
import { AfreecaSearchRule } from '../rule/AfreecaSearchRule';
import { BojRule } from '../rule/BojRule';
import { HelpRule } from '../rule/HelpRule';
import { LolScheduleRule } from '../rule/LolScheduleRule';
import { LoLSchessSearchRule } from '../rule/LoLSchessSearchRule';
import { LolUserRule } from '../rule/LolUserRule';
import { MapleEventRule } from '../rule/MapleEventRule';
import { MovieRule } from '../rule/MovieRule';
import { PokemonRule } from '../rule/PokemonRule';
import { TwitchRule } from '../rule/TwitchRule';

export class IrudaBot extends Bot {
  constructor() {
    super([
      new AfreecaSearchRule(),
      new HelpRule(),
      new MapleEventRule(),
      new MovieRule(),
      new PokemonRule(),
      new TwitchRule(),
      new BojRule(),
      new LolScheduleRule(),
      new LoLSchessSearchRule(),
      new LolUserRule(),
    ]);
  }
}
