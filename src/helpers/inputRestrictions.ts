export const allowOnlyNumber = (value: string): string => {
  return value.replace(/[^0-9]/g, "");
};

export const allowOnlyChar = (value: string): string => {
  return value.replace(/[^a-zA-Z]/g, "");
};
