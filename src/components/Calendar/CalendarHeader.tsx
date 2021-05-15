import styled from 'styled-components';
import MyDate from '../../utils/MyDate/MyDate';
import { mapMonthToText } from './CalendarHelper';

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
    background-color: #eee;
    line-height: 1.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
  `
};

type Props = {
  viewDate: MyDate;
  setViewDate: React.Dispatch<React.SetStateAction<MyDate>>;
};

const CalendarHeader: React.FC<Props> = (props) => {
  const onLeftClick = () => {
    props.setViewDate((prevViewDate) => prevViewDate.diffMonth(-1));
  };

  const onRightClick = () => {
    props.setViewDate((prevViewDate) => prevViewDate.diffMonth(1));
  };

  return (
    <Styled.Container>
      <Styled.Cusor onClick={onLeftClick}>{'<'}</Styled.Cusor>
      <Styled.Title>
        {mapMonthToText[props.viewDate.getMonth()]}&nbsp;&nbsp;
        {props.viewDate.getFullYear()}
      </Styled.Title>
      <Styled.Cusor onClick={onRightClick}>{'>'}</Styled.Cusor>
    </Styled.Container>
  );
};

export default CalendarHeader;
