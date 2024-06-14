import { IMenuItem } from "../types/interfaces/MenuItem";

export const getPath = (menu: IMenuItem[], key: string): string => {
  let path = "";

  const findPath = (menu: IMenuItem[]) => {
    for (const item of menu) {
      if (item.key === key) {
        path = item.path;
        return;
      } else if (item.children) {
        findPath(item.children);
        if (path) return;
      }
    }
  };

  findPath(menu);

  return path;
};
