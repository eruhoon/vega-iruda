import express from 'express';
import { BotHandler } from '../framework/bot/BotHandler';

export class ExpressReceiver extends BotHandler {
  run(): void {
    const app = express();
    const port = 9050;

    app.get('/', (req, res) => {
      const src: string = (req.query.src as string) || '';
      this.doBotProcess(src).then((msg) => {
        res.send(msg);
      });
    });

    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  }
}
