import { TextRule } from '../../framework/rule/TextRule';

export abstract class TargetDateRuleTemplate extends TextRule {
  protected createTargetDate(year: number, month: number, date: number): Date {
    return new Date(`${year}-${month + 1}-${date}`);
  }

  protected createTargetTime(option: TargetTimeOption) {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();
    const hour = option.hour ? option.hour : 0;
    const minute = option.minute ? option.minute : 0;
    const second = option.second ? option.second : 0;
    return new Date(year, month, date, hour, minute, second);
  }
}

export type TargetTimeOption = {
  hour?: number;
  minute?: number;
  second?: number;
};
