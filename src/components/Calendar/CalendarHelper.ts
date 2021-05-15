import MyDate from '../../utils/MyDate/MyDate';
import { Month, Week } from '../../utils/MyDate/MyDateTypes';
import { WEEK_MOD } from '../../utils/MyDate/MyDateConstants';
import { getTotalNumberOfDatesInMonth } from '../../utils/MyDate/MyDateHelper';

import { LAST_DAY_OF_WEEK, DISPLAY_ROW_IN_CALENDAR } from './CalendarContants';
import { CalendarData } from './CalendarTypes';

/**
 * @description: 計算此月在月曆上的最初一天
 * @param {number} year
 * @param {Month} month
 * @return {MyDate} 此月在月曆上的最初一天
 */
export const getFirstDateInCalendar = (year: number, month: Month): MyDate => {
  const myDate = new MyDate(`${year}-${month}-01`);
  const day = myDate.getDay();

  return myDate.diffDate(-day);
};

/**
 * @description: 計算此月在月曆上的最後一天
 * @param {number} year
 * @param {Month} month
 * @return {MyDate} 此月在月曆上的最後一天
 */
export const getLastDateInCalendar = (year: number, month: Month): MyDate => {
  const lastDate = getTotalNumberOfDatesInMonth(year, month);
  const myDate = new MyDate(`${year}-${month}-${lastDate}`);
  const day = myDate.getDay();
  const dayDiff = (LAST_DAY_OF_WEEK - day) as Week;

  return myDate.diffDate(dayDiff);
};

/**
 * @description: 產生此月份的月曆資料
 * @param {number} year
 * @param {Month} month
 * @return {CalendarData} 此月份的月曆資料
 */
export const generateCalendarData = (
  year: number,
  month: Month
): CalendarData => {
  const firstDateInCalendar = getFirstDateInCalendar(year, month);
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
