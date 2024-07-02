import { IMenuItem } from "../types/interfaces/MenuItem";

export const getDefaultOpenKeys = (
  menu: IMenuItem[],
  key: string
): string[] => {
  const result: string[] = [];

  const findDefaultOpenKeys = (
    menu: IMenuItem[],
    currentPath: string[]
  ): void => {
    for (const item of menu) {
      currentPath.push(item.key);
      if (item.key === key) {
        result.push(...currentPath.slice(0, -1));
        return;
      }
      if (item.children) {
        findDefaultOpenKeys(item.children, currentPath);
      }
      currentPath.pop();
    }
  };

  findDefaultOpenKeys(menu, []);
  return result;
};
