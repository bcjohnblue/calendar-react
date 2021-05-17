import MyDate from '../MyDate';

/** 月曆資料 */
export type CalendarData = MyDate[][];

/** 月曆三種形式(年、月、日) */
export type CalendarViewType = 'year' | 'month' | 'date';

/** 月曆可視範圍的資料 */
export type CalendarView = {
  data: CalendarData;
  value: MyDate;
  type: CalendarViewType;
};
