import styled from 'styled-components';
import clsx from 'clsx';
import { mapMonthToText, isEqualMonth, generateCalendarData } from '../helper';
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
    margin-top: 1rem;
  `,
  DateRow: styled(CalendarRow)`
    & > div {
      cursor: pointer;
    }
  `,
  CalendarCell: styled.div`
    width: 4rem;
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px auto;
    border-radius: 50%;

    &.today {
      color: #db3d44;
      font-weight: bold;
    }

    &.selected {
      color: #fff;
      background-color: #db3d44;
    }
  `
};

type Props = CalendarBodyProps & {};
const CalendarMonthBody: React.FC<Props> = (props) => {
  const onCellClick = (cellData: MyDate) => {
    props.setCalendarView((prevCalendarView) => {
      const year = cellData.getFullYear();
      const month = cellData.getMonth();

      return {
        ...prevCalendarView,
        data: generateCalendarData('date')(year, month),
        value: cellData,
        type: 'date'
      };
    });
  };

  return (
    <Styled.Container>
      {props.calendarView.data.map((rowData, rowIndex) => (
        <Styled.DateRow key={rowIndex}>
          {rowData.map((cellData) => (
            <Styled.CalendarCell
              key={`${cellData.year}${cellData.month}`}
              className={clsx({
                today: cellData.isEqual(new MyDate()),
                selected: isEqualMonth(cellData, props.selectedDate)
              })}
              onClick={() => onCellClick(cellData)}
            >
              {mapMonthToText[cellData.month]}
            </Styled.CalendarCell>
          ))}
        </Styled.DateRow>
      ))}
    </Styled.Container>
  );
};

export default CalendarMonthBody;
