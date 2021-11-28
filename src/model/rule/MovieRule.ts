import { GeneralPurposeCardResponse } from '../../framework/response/GeneralPurposeCardResponse';
import { Response } from '../../framework/response/Response';
import { TextResponse } from '../../framework/response/TextReponse';
import { NaverMovieLoader } from '../loader/movie/NaverMovieLoader';
import { ArgumentRuleTemplate } from './ArgumentRuleTemplate';

export class MovieRule extends ArgumentRuleTemplate {
  #loader = new NaverMovieLoader();

  constructor() {
    super('영화');
  }

  protected async makeMessageWithArg(arg: string): Promise<Response> {
    const movie = await this.#loader.getData(arg);
    if (movie === null) {
      return new TextResponse('영화 없음');
    } else {
      return new GeneralPurposeCardResponse({
        link: movie.link,
        title: movie.title,
        icon: movie.image,
        subtitle: movie.pubDate,
        orientation: 'vertical',
        showType: 'new-window',
      });
    }
  }
}
