import { Bot } from './Bot';

export abstract class BotHandler {
  #bot: Bot | null = null;

  setBot(bot: Bot | null): void {
    this.#bot = bot;
  }

  async doBotProcess(text: string): Promise<string | null> {
    return this.#bot ? await this.#bot.process(text) : null;
  }
}
