interface MenuItem {
  key: string;
  label: string;
  children?: MenuItem[];
}

export const changeMenuLastChild = (items: MenuItem[]) => {
  items.forEach((item) => {
    if (item.children && item.children?.length === 0) {
      item.children = undefined;
    } else {
      changeMenuLastChild(item.children as MenuItem[]);
    }
  });
  return items;
};
