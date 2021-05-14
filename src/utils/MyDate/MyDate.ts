import type { Month, Week } from './MyDateTypes';
import {
  _getDayByApplyGaussianAlgorithm,
  getTotalNumberOfDatesInMonth
} from './MyDateHelper';
import { INITIAL_MY_DATE } from './MyDateConstants';

class MyDate {
  year: number = INITIAL_MY_DATE.YEAR;
  month: Month = INITIAL_MY_DATE.MONTH;
  date: number = INITIAL_MY_DATE.DATE;

  constructor(date: string | null) {
    const dateList = date?.split('-');
    if (!dateList) return;

    this.year = +dateList[0];
    this.month = +dateList[1].toString() as Month;
    this.date = +dateList[2];
  }

  getFullYear(): number {
    return this.year;
  }

  setFullYear(year: number): MyDate {
    this.year = year;
    return this;
  }

  getMonth(): Month {
    return this.month;
  }

  setMonth(month: Month): MyDate {
    this.month = month;
    return this;
  }

  diffMonth(monthDiff: number): MyDate {
    const FIRST_MONTH = 1;
    const LAST_MONTH = 12;

    const newDate = new MyDate(`${this.year}-${this.month}-${this.date}`);
    const year = newDate.getFullYear();
    const month = newDate.getMonth();

    if (monthDiff > 0) {
      for (let index = 0; index < monthDiff; index++) {
        if (month + 1 > LAST_MONTH) {
          newDate.setFullYear(year + 1);
          newDate.setMonth(FIRST_MONTH);
        } else {
          newDate.setMonth((month + 1) as Month);
        }
      }
    } else {
      for (let index = 0; monthDiff < index; index--) {
        if (month - 1 < FIRST_MONTH) {
          newDate.setFullYear(year - 1);
          newDate.setMonth(LAST_MONTH);
        } else {
          newDate.setMonth((month - 1) as Month);
        }
      }
    }

    return newDate;
  }

  getDay(): Week {
    return _getDayByApplyGaussianAlgorithm(this.year, this.month, this.date);
  }

  getDate(): number {
    return this.date;
  }

  setDate(date: number): MyDate {
    this.date = date;
    return this;
  }

  diffDate(dateDiff: number) {
    const firstDayInMonth = 1;

    let newDate = new MyDate(`${this.year}-${this.month}-${this.date}`);
    let lastDateInMonth = getTotalNumberOfDatesInMonth(
      newDate.getFullYear(),
      newDate.getMonth()
    );

    if (dateDiff > 0) {
      for (let index = 0; index < dateDiff; index++) {
        if (newDate.getDate() + 1 > lastDateInMonth) {
          newDate = newDate.diffMonth(1);
          lastDateInMonth = getTotalNumberOfDatesInMonth(
            newDate.getFullYear(),
            newDate.getMonth()
          );
          newDate.setDate(firstDayInMonth);
        } else {
          newDate.setDate(newDate.getDate() + 1);
        }
      }
    } else {
      for (let index = 0; dateDiff < index; index--) {
        if (newDate.getDate() - 1 < firstDayInMonth) {
          newDate = newDate.diffMonth(-1);
          lastDateInMonth = getTotalNumberOfDatesInMonth(
            newDate.getFullYear(),
            newDate.getMonth()
          );
          newDate.setDate(lastDateInMonth);
        } else {
          newDate.setDate(newDate.getDate() - 1);
        }
      }
    }

    return newDate;
  }
}

export default MyDate;
