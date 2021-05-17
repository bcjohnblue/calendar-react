import { useState, useEffect } from 'react';
import { ReactComponent as CalendarSVG } from '../assets/calendar.svg';
import styled from 'styled-components';
import { DatePickerType, DatePickerValue } from './types';
import { isValidDate } from './helper';

import Calendar from '../Calendar';
import MyDate from '../MyDate';

const COLOR = '#1CA2D0';

const DatePickerInput = styled.input`
  border: none;
  outline: none;
  display: inline-block;
  text-align: center;
`;

type ContainerProps = { isFocus: boolean };
const Styled = {
  Container: styled.div<ContainerProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150px;
    border: 1px solid ${(props) => (props.isFocus ? COLOR : 'black')};
    padding: 5px;
    border-radius: 3px;
    margin-bottom: 5px;
  `,
  SVGContainer: styled.span`
    margin-right: 10px;
    cursor: pointer;
  `,
  Year: styled(DatePickerInput)`
    width: 40px;
  `,
  Month: styled(DatePickerInput)`
    width: 25px;
  `,
  Date: styled(DatePickerInput)`
    width: 25px;
  `,
  Backdrop: styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 1;
  `
};

const DatePicker = () => {
  const [isFocus, setIsFocus] = useState(false);
  const onFocus = () => {
    setIsFocus(true);
  };
  const onBlur = () => {
    setIsFocus(false);
  };

  const [value, setValue] = useState<DatePickerValue>({
    year: '',
    month: '',
    date: ''
  });
  const onChange =
    (type: DatePickerType) => (value: HTMLInputElement['value']) => {
      if (isNaN(+value)) return;
      setValue((prevValue) => ({
        ...prevValue,
        [type]: value
      }));
    };

  const [date, setDate] = useState<string | null>(null);
  useEffect(() => {
    const composedDate = `${value.year}-${value.month}-${value.date}`;
    if (isValidDate(composedDate)) setDate(composedDate);
  }, [value]);

  const [visible, setVisible] = useState(false);
  const onCalendarIconClick = () => {
    setVisible(true);
  };
  const onBackDropClick = () => {
    console.log('onBackDropClick');

    setVisible(false);
  };

  const onSelect = (date: MyDate) => {
    setValue({
      year: date.getFullYear().toString(),
      month: date.getMonth().toString().padStart(2, '0'),
      date: date.getDate().toString().padStart(2, '0')
    });
    setDate(date.toString());
    setVisible(false);
  };

  return (
    <>
      <Styled.Container isFocus={isFocus}>
        <Styled.SVGContainer onClick={onCalendarIconClick}>
          <CalendarSVG width={20} height={20} fill={COLOR} />
        </Styled.SVGContainer>
        <Styled.Year
          maxLength={4}
          placeholder="YYYY"
          value={value.year?.toString()}
          onChange={(e) => onChange('year')(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
        ></Styled.Year>
        <span>-</span>
        <Styled.Month
          maxLength={2}
          placeholder="MM"
          value={value.month?.toString()}
          onChange={(e) => onChange('month')(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
        ></Styled.Month>
        <span>-</span>
        <Styled.Date
          maxLength={2}
          placeholder="DD"
          value={value.date?.toString()}
          onChange={(e) => onChange('date')(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
        ></Styled.Date>
      </Styled.Container>
      {visible ? (
        <>
          <div onClick={(e) => e.stopPropagation()}>
            <Calendar date={date} onSelect={onSelect}></Calendar>
          </div>
          <Styled.Backdrop onClick={onBackDropClick}></Styled.Backdrop>
        </>
      ) : null}
    </>
  );
};

export default DatePicker;
