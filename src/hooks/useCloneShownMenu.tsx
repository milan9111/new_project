import { IMenuItem } from "../types/interfaces/MenuItem";

const useCloneShowMenu = () => {
  const addNewChildren = (
    clone: IMenuItem[],
    key: string,
    newChildren: IMenuItem[] | null
  ): boolean => {
    for (const item of clone) {
      if (item.key === key) {
        item.children = newChildren;
        return true;
      }
      if (item.children) {
        if (addNewChildren(item.children, key, newChildren)) {
          return true;
        }
      }
    }
    return false;
  };

  const letShowMenuRecursion = (
    menu: IMenuItem[],
    e: string[],
    clone: IMenuItem[]
  ) => {
    menu.forEach((row) => {
      if (e.includes(row.key)) {
        if (row.children) {
          const newChildren: IMenuItem[] = row.children.map((child) => ({
            ...child,
            children: child.children ? [] : null,
          }));
          addNewChildren(clone, row.key, newChildren);
          letShowMenuRecursion(row.children, e, clone);
        } else {
          addNewChildren(clone, row.key, null);
        }
      } else {
        addNewChildren(clone, row.key, row.children ? [] : null);
      }
    });
  };

  return letShowMenuRecursion;
};

export default useCloneShowMenu;
