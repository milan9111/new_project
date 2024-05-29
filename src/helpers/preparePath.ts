export const toURL = (path: string): string => {
  const preparedPath = path
    .split("")
    .map((item) => {
      if (item === "/") return "-";
      if (item === ".") return "_";
      return item;
    })
    .join("");
  return preparedPath;
};

export const fromURL = (path: string): string => {
  const preparedPath = path
    .split("")
    .map((item) => {
      if (item === "-") return "/";
      if (item === "_") return ".";
      return item;
    })
    .join("");
  return preparedPath;
};
