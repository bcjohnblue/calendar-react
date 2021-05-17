import MyDate, { WEEK_MOD } from '../../MyDate';
import type { Month } from '../../MyDate';

import { DISPLAY_ROW_IN_CALENDAR } from '../contants';
import { CalendarData, CalendarViewType } from '../types';

/**
 * @description: 計算此月在月曆上的最初一天
 * @param {number} year
 * @param {Month} month
 * @return {MyDate} 此月在月曆上的最初一天
 */
const _getFirstDateInCalendar = (year: number, month: Month): MyDate => {
  const myDate = new MyDate(`${year}-${month}-01`);
  const day = myDate.getDay();

  return myDate.diffDate(-day);
};

/**
 * @description: 產生12年份的月曆資料
 * @param {number} year
 * @return {CalendarData} 12年份的月曆資料
 */
const _generateCalendarYearData = (year: number): CalendarData => {
  const initCalendarData = (firstYear: MyDate): CalendarData => {
    const DISPLAY_ROW_IN_CALENDAR = 3;
    const DISPLAY_COLUMN_IN_CALENDAR = 4;
    const calendarData: CalendarData = Array.from(
      Array(DISPLAY_ROW_IN_CALENDAR),
      () => []
    );

    let temp = firstYear;
    for (let rowIndex = 0; rowIndex < DISPLAY_ROW_IN_CALENDAR; rowIndex++) {
      for (
        let columnIndex = 0;
        columnIndex < DISPLAY_COLUMN_IN_CALENDAR;
        columnIndex++
      ) {
        calendarData[rowIndex].push(temp);
        temp = temp.diffYear(1);
      }
    }

    return calendarData;
  };

  const firstYear = Math.floor(year / 10) * 10 - 1;
  const firstYearInCalendar = new MyDate(`${firstYear}-01-01`);
  return initCalendarData(firstYearInCalendar);
};

/**
 * @description: 產生此年份的月曆資料
 * @param {number} year
 * @return {CalendarData} 此年份的月曆資料
 */
const _generateCalendarMonthData = (year: number): CalendarData => {
  const initCalendarData = (firstMonth: MyDate): CalendarData => {
    const DISPLAY_ROW_IN_CALENDAR = 3;
    const DISPLAY_COLUMN_IN_CALENDAR = 4;
    const calendarData: CalendarData = Array.from(
      Array(DISPLAY_ROW_IN_CALENDAR),
      () => []
    );

    let temp = firstMonth;
    for (let rowIndex = 0; rowIndex < DISPLAY_ROW_IN_CALENDAR; rowIndex++) {
      for (
        let columnIndex = 0;
        columnIndex < DISPLAY_COLUMN_IN_CALENDAR;
        columnIndex++
      ) {
        calendarData[rowIndex].push(temp);
        temp = temp.diffMonth(1);
      }
    }

    return calendarData;
  };

  const firstMonthInCalendar = new MyDate(`${year}-01-01`);
  return initCalendarData(firstMonthInCalendar);
};

/**
 * @description: 產生此月份的月曆資料
 * @param {number} year
 * @param {Month} month
 * @return {CalendarData} 此月份的月曆資料
 */
const _generateCalendarDateData = (
  year: number,
  month: Month
): CalendarData => {
  const firstDateInCalendar = _getFirstDateInCalendar(year, month);
  const initCalendarData = (firstDate: MyDate): CalendarData => {
    const calendarData: CalendarData = Array.from(
      Array(DISPLAY_ROW_IN_CALENDAR),
      () => []
    );

    let tempDate = firstDate;
    for (let rowIndex = 0; rowIndex < DISPLAY_ROW_IN_CALENDAR; rowIndex++) {
      for (let weekIndex = 0; weekIndex < WEEK_MOD; weekIndex++) {
        calendarData[rowIndex].push(tempDate);
        tempDate = tempDate.diffDate(1);
      }
    }

    return calendarData;
  };

  return initCalendarData(firstDateInCalendar);
};

/**
 * @description: 產生此月份的月曆資料
 * @param {number} year
 * @param {Month} month
 * @return {CalendarData} 此月份的月曆資料
 */
export const generateCalendarData =
  (type: CalendarViewType) =>
  (year: number, month?: Month): CalendarData => {
    if (type === 'date' && month === undefined) {
      throw new Error('The Parameter month is required');
    }

    const mapTypeToData = {
      year: _generateCalendarYearData(year),
      month: _generateCalendarMonthData(year),
      date: _generateCalendarDateData(year, month as Month)
    };

    return mapTypeToData[type];
  };
