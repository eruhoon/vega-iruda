import { TextRule } from '../../framework/rule/TextRule';

const ONE_SECOND = 1000;
const ONE_MINUTE = 60 * ONE_SECOND;
const ONE_HOUR = 60 * ONE_MINUTE;
const ONE_DAY = 24 * ONE_HOUR;

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

  protected getDiff(target: number): DiffTime {
    const now = new Date().getTime();

    const diff = target - now;
    return {
      day: Math.floor(diff / ONE_DAY),
      hour: Math.floor((diff % ONE_DAY) / ONE_HOUR),
      minute: Math.floor((diff % ONE_HOUR) / ONE_MINUTE),
      second: Math.floor((diff % ONE_MINUTE) / ONE_SECOND),
    };
  }
}

export type TargetTimeOption = {
  hour?: number;
  minute?: number;
  second?: number;
};

export type DiffTime = {
  day: number;
  hour: number;
  minute: number;
  second: number;
};
