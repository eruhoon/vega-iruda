import { Bot } from './Bot';

export abstract class BotHandler {
  private mBot: Bot | null = null;

  public setBot(bot: Bot | null): void {
    this.mBot = bot;
  }

  public async doBotProcess(text: string): Promise<string | null> {
    return this.mBot ? await this.mBot.process(text) : null;
  }
}
