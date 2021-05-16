import MyDate from '../../MyDate';

export const isEqualYear = (
  date1: MyDate | null,
  date2: MyDate | null
): boolean => {
  if (date1 === null || date2 === null) return false;
  if (date1.getFullYear() !== date2.getFullYear()) return false;
  return true;
};

export const isEqualMonth = (
  date1: MyDate | null,
  date2: MyDate | null
): boolean => {
  if (date1 === null || date2 === null) return false;
  if (!isEqualYear(date1, date2)) return false;
  if (date1.getMonth() !== date2.getMonth()) return false;
  return true;
};

export const isEqualDate = (
  date1: MyDate | null,
  date2: MyDate | null
): boolean => {
  if (date1 === null || date2 === null) return false;
  if (!isEqualMonth(date1, date2)) return false;
  if (date1.getDate() !== date2.getDate()) return false;
  return true;
};
