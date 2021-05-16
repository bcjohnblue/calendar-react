import MyDate from '../MyDate';

export type CalendarData = MyDate[][];

export type CalendarViewType = 'year' | 'month' | 'date';
export type CalendarView = {
  data: CalendarData;
  value: MyDate;
  type: CalendarViewType;
};
