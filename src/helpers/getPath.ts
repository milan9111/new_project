interface MenuItem {
  key: string;
  label: string;
  path: string;
  children: MenuItem[] | null;
}

export const getPath = (menu: MenuItem[], key: string): string => {
  let path = "";

  const findPath = (menu: MenuItem[]) => {
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
