import dayjs from "dayjs";

export const getDateForDatepicker = (
  value: string | number | boolean | dayjs.Dayjs | null | undefined
) => {
  switch (value) {
    case "today":
      return dayjs();

    case null:
    case undefined:
      return value;

    default:
      return value;
  }
};
