import { useState } from 'react';
import MyDate from '../../MyDate';
import { generateCalendarData } from '../helper';
import styled from 'styled-components';

import CalendarHeader from '../CalendarHeader/CalendarHeader';
import CalendarBody from '../CalendarBody/CalendarBody';
import { CalendarView } from '../types';

const Styled = {
  Calendar: styled.div`
    margin: 10px;
    padding: 20px;
    border: 1px solid black;
  `
};

const Calendar = () => {
  const [calendarView, setCalendarView] = useState<CalendarView>(() => {
    const now = new MyDate();
    return {
      data: generateCalendarData('date')(now.getFullYear(), now.getMonth()),
      value: now,
      type: 'date'
    };
  });

  // console.log('2018-03', new MyDate('2018-03-01').getDay());
  

  const [selectedDate, setSelectedDate] = useState<MyDate>(new MyDate());

  return (
    <Styled.Calendar>
      <CalendarHeader
        calendarView={calendarView}
        setCalendarView={setCalendarView}
      ></CalendarHeader>
      <CalendarBody
        calendarView={calendarView}
        setCalendarView={setCalendarView}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      ></CalendarBody>
    </Styled.Calendar>
  );
};

export default Calendar;
