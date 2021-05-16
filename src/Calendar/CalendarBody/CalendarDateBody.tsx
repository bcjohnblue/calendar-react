import styled from 'styled-components';
import clsx from 'clsx';
import { isEqualDate } from '../helper';
import MyDate from '../../MyDate';
import type { CalendarBodyProps } from './CalendarBody';

const CalendarRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const Styled = {
  Container: styled.div`
    display: grid;
    grid-template-rows: repeat(6, 1fr);
  `,
  WeekRow: styled(CalendarRow)`
    font-weight: bold;
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

const weeksData = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

type Props = CalendarBodyProps & {};
const CalendarBody: React.FC<Props> = (props) => {
  const now = new MyDate();
  const onCellClick = (cellData: MyDate) => {
    props.setSelectedDate(cellData);
  };

  return (
    <Styled.Container>
      <Styled.WeekRow>
        {weeksData.map((weekData) => (
          <Styled.CalendarCell key={weekData}>{weekData}</Styled.CalendarCell>
        ))}
      </Styled.WeekRow>
      {props.calendarView.data.map((rowData, rowIndex) => (
        <Styled.DateRow key={rowIndex}>
          {rowData.map((cellData) => (
            <Styled.CalendarCell
              key={`${cellData.month}${cellData.date}`}
              className={clsx({
                today: cellData.isEqual(now),
                outside:
                  cellData.getMonth() !== props.calendarView.value.getMonth(),
                selected: isEqualDate(cellData, props.selectedDate)
              })}
              onClick={() => onCellClick(cellData)}
            >
              {cellData.date}
            </Styled.CalendarCell>
          ))}
        </Styled.DateRow>
      ))}
    </Styled.Container>
  );
};

export default CalendarBody;
