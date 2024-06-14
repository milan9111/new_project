import { IMenuItem } from "../types/interfaces/MenuItem";

export const searchMenuByLabel = (
  menu: IMenuItem[],
  label: string
): IMenuItem[] => {
  const result: IMenuItem[] = [];
  const lowerCaseLabel = label.toLowerCase();

  menu.forEach((item) => {
    const match = item.label.toLowerCase().includes(lowerCaseLabel);
    const childrenMatches =
      item.children && item.children.length > 0
        ? searchMenuByLabel(item.children, label)
        : [];

    if (match || childrenMatches.length > 0) {
      result.push({
        ...item,
        children: childrenMatches.length > 0 ? childrenMatches : null,
      });
    }
  });

  return result;
};
