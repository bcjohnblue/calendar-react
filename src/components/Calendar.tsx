import React from 'react';
import { getDay, getTotalNumberOfDaysInMonth } from '../utils';

const Calendar = () => {
  console.log('day', getDay('2021-06-01'));
  console.log(
    'total days',
    getTotalNumberOfDaysInMonth({ year: 2020, month: 2 })
  );

  return <div></div>;
};

export default Calendar;
