const isLeapYear = (year: number) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export const getTotalNumberOfDaysInMonth = (params: {
  year: number;
  month: Month;
}) => {
  const { year, month } = params;

  const mapMonthToTotalDate = {
    1: 31,
    2: isLeapYear(year) ? 29 : 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31
  };

  return mapMonthToTotalDate[month];
};

export const WEEK_MOD = 7;

const getDayByApplyGaussianAlgorithm = (
  year: number,
  month: number,
  date: number
) => {
  const applyGaussianAlgorithm = (
    y: number,
    c: number,
    m: number,
    d: number
  ) => {
    const gaussianValue = Math.floor(
      d + (2.6 * m - 0.2) + y + y / 4 + c / 4 - 2 * c
    );
    if (gaussianValue >= 0) return gaussianValue % WEEK_MOD;
    return gaussianValue + WEEK_MOD;
  };

  const getNormalizeYear = (y: number, m: number) => {
    if (m === 1 || m === 2) return +y - 1;
    return y;
  };

  const normalizeYear = getNormalizeYear(year, month);
  const lastTwoDigitsOfNormalizeYear = normalizeYear % 100;
  const firstTwoDigitsOfNormalizeYear = Math.floor(normalizeYear / 100);

  const shiftedMonth = ((month + 9) % 12) + 1;

  return applyGaussianAlgorithm(
    lastTwoDigitsOfNormalizeYear,
    firstTwoDigitsOfNormalizeYear,
    shiftedMonth,
    date
  );
};

export const getDay = (date: string | null) => {
  const dateList = date?.split('-');
  if (!dateList) return;
  const y = dateList[0];
  const m = +dateList[1].toString();
  const d = dateList[2];

  return getDayByApplyGaussianAlgorithm(+y, +m, +d);
};
