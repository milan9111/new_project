import dayjs from "dayjs";

export const formatDateReview = (date: Date | string) =>
  dayjs(date).format("MM.DD.YYYY, h:mm:ss a");
