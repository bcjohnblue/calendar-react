import React from 'react';
import MyDate from '../../utils/MyDate/MyDate';
import { generateCalendarData } from './CalendarHelper';

const Calendar = () => {
  const myDate = new MyDate('2021-05-01');

  console.log(generateCalendarData(2021, 5));

  return <div></div>;
};

export default Calendar;
