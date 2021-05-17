import { CalendarView } from '../types';
import MyDate from '../../MyDate';

import CalendarYearBody from './CalendarYearBody';
import CalendarMonthBody from './CalendarMonthBody';
import CalendarDateBody from './CalendarDateBody';

export type CalendarBodyProps = {
  calendarView: CalendarView;
  setCalendarView: React.Dispatch<React.SetStateAction<CalendarView>>;
  selectedDate: MyDate | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<MyDate>>;
  onSelect: (date: MyDate) => void;
};
const CalendarBody: React.FC<CalendarBodyProps> = (props) => {
  const mapViewTypeToDOM = {
    year: <CalendarYearBody {...props} />,
    month: <CalendarMonthBody {...props} />,
    date: <CalendarDateBody {...props} />
  };

  return mapViewTypeToDOM[props.calendarView.type];
};

export default CalendarBody;
