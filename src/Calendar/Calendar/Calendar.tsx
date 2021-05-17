import { useState, useEffect, useMemo } from 'react';
import MyDate from '../../MyDate';
import { generateCalendarData } from '../helper';
import styled from 'styled-components';

import CalendarHeader from '../CalendarHeader/CalendarHeader';
import CalendarBody from '../CalendarBody/CalendarBody';
import { CalendarView } from '../types';

const Styled = {
  Calendar: styled.div`
    padding: 20px;
    border: 1px solid black;
    width: 500px;
    z-index: 100;
  `
};

const initCalendarView = (initDate: MyDate): CalendarView => {
  return {
    data: generateCalendarData('date')(
      initDate.getFullYear(),
      initDate.getMonth()
    ),
    value: initDate,
    type: 'date'
  };
};

type CalendarProps = {
  date: string | null;
  onSelect: (date: MyDate) => void;
};
const Calendar: React.FC<CalendarProps> = (props) => {
  const date = useMemo(() => new MyDate(props.date), [props.date]);
  const [selectedDate, setSelectedDate] = useState<MyDate>(date);
  const [calendarView, setCalendarView] = useState<CalendarView>(() =>
    initCalendarView(date)
  );

  useEffect(() => {
    setSelectedDate(date);
    setCalendarView(initCalendarView(date));
  }, [date]);

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
        onSelect={props.onSelect}
      ></CalendarBody>
    </Styled.Calendar>
  );
};

export default Calendar;
