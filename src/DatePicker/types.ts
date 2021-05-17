export type DatePickerType = 'year' | 'month' | 'date';

export type DatePickerValue = {
  [key in DatePickerType]: string | null;
};
