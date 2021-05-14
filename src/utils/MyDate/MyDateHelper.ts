import type { Month, Week } from './MyDateTypes';
import { WEEK_MOD } from './MyDateConstants';

/**
 * @description: 利用 Gaussian algorithm 計算是傳入日期是星期幾
 * @reference https://calendars.wikia.org/wiki/Calculating_the_day_of_the_week
 * @param {year} 年
 * @param {month} 月
 * @param {date} 日
 * @return {WEEK} 星期ㄧ、二...
 */
export const _getDayByApplyGaussianAlgorithm = (
  year: number,
  month: number,
  date: number
): Week => {
  const applyGaussianAlgorithm = (
    y: number,
    c: number,
    m: number,
    d: number
  ): Week => {
    const gaussianValue = Math.floor(
      d + (2.6 * m - 0.2) + y + y / 4 + c / 4 - 2 * c
    );
    if (gaussianValue >= 0) return (gaussianValue % WEEK_MOD) as Week;
    return (gaussianValue + WEEK_MOD) as Week;
  };

  const getNormalizeYear = (y: number, m: number) => {
    if (m === 1 || m === 2) return +y - 1;
    return y;
  };

  const normalizeYear = getNormalizeYear(year, month);
  const lastTwoDigitsOfNormalizeYear = normalizeYear % 100;
  const firstTwoDigitsOfNormalizeYear = Math.floor(normalizeYear / 100);

  const shiftedMonth = ((month + 9) % 12) + 1;

  return applyGaussianAlgorithm(
    lastTwoDigitsOfNormalizeYear,
    firstTwoDigitsOfNormalizeYear,
    shiftedMonth,
    date
  );
};

/**
 * @description: 是否閏年
 * @param {number} year
 * @return {boolean}
 */
export const isLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

/**
 * @description: 這個月總共有幾天
 * @param {*}
 * @return {number} 28, 29, 30, 31
 */
export const getTotalNumberOfDatesInMonth = (
  year: number,
  month: Month
): number => {
  const mapMonthToTotalDate = {
    1: 31,
    2: isLeapYear(year) ? 29 : 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31
  };

  return mapMonthToTotalDate[month];
};
