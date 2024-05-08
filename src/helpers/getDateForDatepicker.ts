import dayjs from "dayjs";

export const getDateForDatepicker = (
  value: string | number | boolean | dayjs.Dayjs | null | undefined
): dayjs.Dayjs | null => {
  if (value) return dayjs(value as string);

  return null;
};
