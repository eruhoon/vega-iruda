import { Bot } from '../../framework/bot/Bot';
import { AfreecaSearchRule } from '../rule/AfreecaSearchRule';
import { AnimationRule } from '../rule/AnimationRule';
import { BojRule } from '../rule/BojRule';
import { CharacterSearchRule } from '../rule/CharacterSearchRule';
import { ClockRule } from '../rule/ClockRule';
import { DustRule } from '../rule/DustRule';
import { GandelRule } from '../rule/GandelRule';
import { HelpRule } from '../rule/HelpRule';
import { HoenyChampRule } from '../rule/HoneyChampRule';
import { KarylRule } from '../rule/KarylRule';
import { LolScheduleRule } from '../rule/LolScheduleRule';
import { LoLSchessSearchRule } from '../rule/LoLSchessSearchRule';
import { LolUserRule } from '../rule/LolUserRule';
import { MapleEventRule } from '../rule/MapleEventRule';
import { MeguminRule } from '../rule/MeguminRule';
import { MovieRule } from '../rule/MovieRule';
import { NamuWikiRule } from '../rule/NamuWikiRule';
import { PengRule } from '../rule/PengRule';
import { PokemonRule } from '../rule/PokemonRule';
import { PollenRule } from '../rule/PollenRule';
import { RandomNumberRule } from '../rule/RandomNumberRule';
import { SearchRule } from '../rule/SearchRule';
import { TeraBurningRule } from '../rule/TeraBurningRule';
import { TwitchRule } from '../rule/TwitchRule';
import { TyphoonRule } from '../rule/TyphoonRule';
import { VaccineRule } from '../rule/VaccineRule';
import { VaccinePassRule } from '../rule/VaccinPassRule';
import { WeatherRule } from '../rule/WeatherRule';
import { YungRule } from '../rule/YungRule';

export class IrudaBot extends Bot {
  constructor() {
    super([
      new AfreecaSearchRule(),
      new AnimationRule(),
      new HelpRule(),
      new NamuWikiRule(),
      new SearchRule(),
      new RandomNumberRule(),
      new ClockRule(),
      new GandelRule(),
      new MeguminRule(),
      new MapleEventRule(),
      new MovieRule(),
      new PengRule(),
      new YungRule(),
      new KarylRule(),
      new PokemonRule(),
      new TyphoonRule(),
      new TwitchRule(),
      new BojRule(),
      new CharacterSearchRule(),
      new PollenRule(),
      new DustRule(),
      new LolScheduleRule(),
      new LoLSchessSearchRule(),
      new LolUserRule(),
      new VaccineRule(),
      new VaccinePassRule(),
      new WeatherRule(),
      new TeraBurningRule(),
      new HoenyChampRule(),
    ]);
  }
}
