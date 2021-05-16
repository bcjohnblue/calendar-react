import type { Month } from '../../MyDate';

/**
 * @description: 將月份轉換為文字
 * @param {Month}
 * @return {*} Jan, Feb, Mar...
 */
type MapMonthToText = {
  [key in Month]: string;
};
export const mapMonthToText: MapMonthToText = {
  1: 'Jan',
  2: 'Feb',
  3: 'Mar',
  4: 'Apr',
  5: 'May',
  6: 'Jun',
  7: 'Jul',
  8: 'Aug',
  9: 'Sep',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec'
};

/**
 * @description: 取得 min, max 年份 (ex. year: 2018 => min: 2010, max: 2019)
 * @param {*} type
 * @return {*} min, max
 */
export const getMinMaxYear = (type: 'min' | 'max') => (year: number) => {
  const mapTypeToYear = {
    min: Math.floor(year / 10) * 10,
    max: Math.ceil((year + 1) / 10) * 10 - 1
  };

  return mapTypeToYear[type];
};

export * from './generateData';
export * from './isEqual';
