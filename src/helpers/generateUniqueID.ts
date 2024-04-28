export const generateUniqueId = (): string => {
  const timestamp = Date.now().toString();
  const randomNum = Math.random().toString().slice(2, 8);
  return timestamp + randomNum;
};
