import styled from 'styled-components';
import clsx from 'clsx';
import { isEqualYear, generateCalendarData, getMinMaxYear } from '../helper';
import MyDate from '../../MyDate';
import type { CalendarBodyProps } from './CalendarBody';

const CalendarRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

const Styled = {
  Container: styled.div`
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    margin-top: 50px;
  `,
  DateRow: styled(CalendarRow)`
    & > div {
      cursor: pointer;
    }
  `,
  CalendarCell: styled.div`
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px auto;
    border-radius: 50%;

    &.today {
      color: #db3d44;
      font-weight: bold;
    }

    &.outside {
      color: gray;
    }

    &.selected {
      color: #fff;
      background-color: #db3d44;
    }
  `
};

type Props = CalendarBodyProps & {};
const CalendarYearBody: React.FC<Props> = (props) => {
  const now = new MyDate();
  const onCellClick = (cellData: MyDate) => {
    props.setCalendarView((prevCalendarView) => {
      const year = cellData.getFullYear();

      return {
        ...prevCalendarView,
        data: generateCalendarData('month')(year),
        value: cellData,
        type: 'month'
      };
    });
  };

  const getIsOutside = (cellData: MyDate) =>
    cellData.getFullYear() <
      getMinMaxYear('min')(props.calendarView.value.getFullYear()) ||
    cellData.getFullYear() >
      getMinMaxYear('max')(props.calendarView.value.getFullYear());

  return (
    <Styled.Container>
      {props.calendarView.data.map((rowData, rowIndex) => (
        <Styled.DateRow key={rowIndex}>
          {rowData.map((cellData) => (
            <Styled.CalendarCell
              key={`${cellData.year}`}
              className={clsx({
                today: cellData.isEqual(now),
                outside: getIsOutside(cellData),
                selected: isEqualYear(cellData, props.selectedDate)
              })}
              onClick={() => onCellClick(cellData)}
            >
              {cellData.year}
            </Styled.CalendarCell>
          ))}
        </Styled.DateRow>
      ))}
    </Styled.Container>
  );
};

export default CalendarYearBody;
