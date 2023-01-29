import { Bot } from '../../framework/bot/Bot';
import { AfreecaSearchRule } from '../rule/AfreecaSearchRule';
import { AnimationRule } from '../rule/AnimationRule';
import { BojRule } from '../rule/BojRule';
import { CharacterSearchRule } from '../rule/CharacterSearchRule';
import { HelpRule } from '../rule/HelpRule';
import { HoenyChampRule } from '../rule/HoneyChampRule';
import { LolScheduleRule } from '../rule/LolScheduleRule';
import { LoLSchessSearchRule } from '../rule/LoLSchessSearchRule';
import { LolUserRule } from '../rule/LolUserRule';
import { MapleEventRule } from '../rule/MapleEventRule';
import { MeguminRule } from '../rule/MeguminRule';
import { MovieRule } from '../rule/MovieRule';
import { NamuWikiRule } from '../rule/NamuWikiRule';
import { PokemonRule } from '../rule/PokemonRule';
import { SearchRule } from '../rule/SearchRule';
import { TwitchRule } from '../rule/TwitchRule';
import { VaccineRule } from '../rule/VaccineRule';
import { VaccinePassRule } from '../rule/VaccinPassRule';

export class IrudaBot extends Bot {
  constructor() {
    super([
      new AfreecaSearchRule(),
      new AnimationRule(),
      new HelpRule(),
      new NamuWikiRule(),
      new SearchRule(),
      new MeguminRule(),
      new MapleEventRule(),
      new MovieRule(),
      new PokemonRule(),
      new TwitchRule(),
      new BojRule(),
      new CharacterSearchRule(),
      new LolScheduleRule(),
      new LoLSchessSearchRule(),
      new LolUserRule(),
      new VaccineRule(),
      new VaccinePassRule(),
      new HoenyChampRule(),
    ]);
  }
}
