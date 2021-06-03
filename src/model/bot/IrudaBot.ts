import { Bot } from '../../framework/bot/Bot';
import { CoronaRule } from '../rule/CoronaRule';
import { HelpRule } from '../rule/HelpRule';
import { NamuWikiRule } from '../rule/NamuWikiRule';
import { RandomNumberRule } from '../rule/RandomNumberRule';
import { SearchRule } from '../rule/SearchRule';
import { ClockRule } from '../rule/ClockRule';
import { GandelRule } from '../rule/GandelRule';
import { PengRule } from '../rule/PengRule';
import { PokemonRule } from '../rule/PokemonRule';
import { TyphoonRule } from '../rule/TyphoonRule';
import { BojRule } from '../rule/BojRule';
import { CharacterSearchRule } from '../rule/CharacterSearchRule';
import { PollenRule } from '../rule/PollenRule';
import { DustRule } from '../rule/DustRule';
import { LolScheduleRule } from '../rule/LolScheduleRule';
import { MeguminRule } from '../rule/MeguminRule';
import { LoLSchessSearchRule } from '../rule/LoLSchessSearchRule';

export class IrudaBot extends Bot {
  public constructor() {
    super([
      new HelpRule(),
      new NamuWikiRule(),
      new SearchRule(),
      new RandomNumberRule(),
      new CoronaRule(),
      new ClockRule(),
      new GandelRule(),
      new MeguminRule(),
      new PengRule(),
      new PokemonRule(),
      new TyphoonRule(),
      new BojRule(),
      new CharacterSearchRule(),
      new PollenRule(),
      new DustRule(),
      new LolScheduleRule(),
      new LoLSchessSearchRule(),
    ]);
  }
}
