export const isValidDate = (dateString: string): boolean => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return false;

  const dateList = dateString.split('-');
  const month = +dateList[1];
  const date = +dateList[2];
  if (month < 1 || month > 12) return false;
  if (date < 1 || date > 31) return false;
  return true;
};
