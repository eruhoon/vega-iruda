import { Bot } from '../../framework/bot/Bot';
import { BojRule } from '../rule/BojRule';
import { CharacterSearchRule } from '../rule/CharacterSearchRule';
import { ClockRule } from '../rule/ClockRule';
import { CoronaRule } from '../rule/CoronaRule';
import { DustRule } from '../rule/DustRule';
import { GandelRule } from '../rule/GandelRule';
import { HelpRule } from '../rule/HelpRule';
import { KarylRule } from '../rule/KarylRule';
import { LolScheduleRule } from '../rule/LolScheduleRule';
import { LoLSchessSearchRule } from '../rule/LoLSchessSearchRule';
import { MapleRule } from '../rule/MapleRule';
import { MeguminRule } from '../rule/MeguminRule';
import { NamuWikiRule } from '../rule/NamuWikiRule';
import { PengRule } from '../rule/PengRule';
import { PokemonRule } from '../rule/PokemonRule';
import { PollenRule } from '../rule/PollenRule';
import { RandomNumberRule } from '../rule/RandomNumberRule';
import { SearchRule } from '../rule/SearchRule';
import { TeraBurningRule } from '../rule/TeraBurningRule';
import { TyphoonRule } from '../rule/TyphoonRule';
import { WeatherRule } from '../rule/WeatherRule';
import { YungRule } from '../rule/YungRule';

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
      new MapleRule(),
      new PengRule(),
      new YungRule(),
      new KarylRule(),
      new PokemonRule(),
      new TyphoonRule(),
      new BojRule(),
      new CharacterSearchRule(),
      new PollenRule(),
      new DustRule(),
      new LolScheduleRule(),
      new LoLSchessSearchRule(),
      new WeatherRule(),
      new TeraBurningRule(),
    ]);
  }
}
