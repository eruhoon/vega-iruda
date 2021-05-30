import { Response } from '../response/Response';
import { Rule } from './Rule';

export abstract class TextRule implements Rule<string> {
  abstract match(src: string): boolean;
  abstract makeMessage(src: string): Promise<Response>;
}
