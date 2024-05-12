import { generateRandomString } from "./generateRandomString";

interface MenuItem {
  key: string;
  label: string;
  children?: MenuItem[];
}

export const addRandomKeys = (items: MenuItem[]) => {
  items.forEach((item) => {
    item.key = generateRandomString(8);
    if (item.children && item.children.length > 0) {
      addRandomKeys(item.children);
    }
  });
  return items;
};
