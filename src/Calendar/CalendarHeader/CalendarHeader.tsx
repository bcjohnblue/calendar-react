import { useMemo } from 'react';
import styled from 'styled-components';
import MyDate from '../../MyDate';
import { mapMonthToText } from '../helper';
import { CalendarView, CalendarViewType } from '../types';
import { generateCalendarData, getMinMaxYear } from '../helper';

const Styled = {
  Container: styled.div`
    display: grid;
    grid-template-columns: 1fr 5fr 1fr;
    font-weight: bold;
    font-size: 1.3rem;
    height: 40px;
  `,
  Cusor: styled.span`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  Title: styled.span`
    cursor: pointer;
    line-height: 1.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
  `
};

type Props = {
  calendarView: CalendarView;
  setCalendarView: React.Dispatch<React.SetStateAction<CalendarView>>;
};
const CalendarHeader: React.FC<Props> = (props) => {
  const onCursorClick = (dir: 'left' | 'right') => {
    const sign = dir === 'left' ? -1 : 1;

    props.setCalendarView((prevCalendarView) => {
      const getNextValue = (type: CalendarViewType) => (value: MyDate) => {
        const maxYear = getMinMaxYear('max')(value.getFullYear()) + 1;
        const incrementYear = maxYear - value.getFullYear();

        const mapTypeToNextValue = {
          year: value.diffYear(incrementYear * sign),
          month: value.diffYear(1 * sign),
          date: value.diffMonth(1 * sign)
        };

        return mapTypeToNextValue[type];
      };

      const type = prevCalendarView.type;
      const value = prevCalendarView.value;
      const nextValue = getNextValue(type)(value);
      const nextYear = nextValue.getFullYear();
      const nextMonth = nextValue.getMonth();

      return {
        ...prevCalendarView,
        data: generateCalendarData(type)(nextYear, nextMonth),
        value: nextValue
      };
    });
  };

  const onTitleClick = () => {
    let nextViewData = props.calendarView.data;
    let nextViewValue = props.calendarView.value;
    let nextViewType = props.calendarView.type;

    switch (props.calendarView.type) {
      case 'year':
        break;
      case 'month':
        nextViewData = generateCalendarData('year')(
          nextViewValue.getFullYear()
        );
        nextViewType = 'year';
        break;
      case 'date':
        nextViewData = generateCalendarData('month')(
          nextViewValue.getFullYear()
        );
        nextViewType = 'month';
        break;
      default:
        break;
    }

    if (nextViewType !== props.calendarView.type)
      props.setCalendarView({
        data: nextViewData,
        value: nextViewValue,
        type: nextViewType
      });
  };

  const title = useMemo(() => {
    let element = null;

    switch (props.calendarView.type) {
      case 'year':
        element = (
          <>
            {getMinMaxYear('min')(props.calendarView.value.getFullYear())}-
            {getMinMaxYear('max')(props.calendarView.value.getFullYear())}
          </>
        );
        break;
      case 'month':
        element = <>{props.calendarView.value.getFullYear()}</>;
        break;
      case 'date':
        element = (
          <>
            {mapMonthToText[props.calendarView.value.getMonth()]}&nbsp;&nbsp;
            {props.calendarView.value.getFullYear()}
          </>
        );
        break;
      default:
        element = null;
        break;
    }

    return element;
  }, [props.calendarView]);

  return (
    <Styled.Container>
      <Styled.Cusor onClick={() => onCursorClick('left')}>{'<'}</Styled.Cusor>
      <Styled.Title onClick={onTitleClick}>{title}</Styled.Title>
      <Styled.Cusor onClick={() => onCursorClick('right')}>{'>'}</Styled.Cusor>
    </Styled.Container>
  );
};

export default CalendarHeader;
