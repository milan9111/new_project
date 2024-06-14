/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { EPageRoute } from "../../types/enums/EPageRoute";
import { IMenuItem } from "../../types/interfaces/MenuItem";
import { getMenu } from "../../store/actions/menuActions";
import {
  setDefaultOpenKeys,
  setDefaultSelectedKeys,
  setFilteredMenu,
  setSearchLoading,
  setSearchValue,
  setShownMenu,
} from "../../store/reducers/MenuSlice";
import { debouncing } from "../../helpers/debouncing";
import useAbortableEffect from "../../hooks/useAbortableEffect";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import Menu from "./Menu";

const MenuContainer: FC = () => {
  const {
    menu,
    shownMenu,
    loadingMenu,
    searchValue,
    searchLoading,
    filteredMenu,
    defaultOpenKeys,
    defaultSelectedKeys,
  } = useAppSelector((state) => state.menu);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useAbortableEffect(
    async (abortController: AbortController) => {
      !menu.length && dispatch(getMenu(abortController));
    },
    [],
    []
  );

  const onSearch = (value: string) => {
    dispatch(setSearchLoading(true));
    dispatch(setSearchValue(value));
    debouncing(() => {
      dispatch(setFilteredMenu());
      dispatch(setSearchLoading(false));
    }, 500);
  };

  const onSelectMenuItem = (e: any) => {
    dispatch(setDefaultSelectedKeys(e.selectedKeys));
    navigate(EPageRoute.SETTING_PARAMS_ROUTE.replace(":key", e.key));
  };

  const addNewChildren = (
    clone: IMenuItem[],
    row: IMenuItem,
    newChildren: IMenuItem[] | null
  ) => {
    const foundRowFromClone = clone.find((item) => item.key === row.key);
    if (foundRowFromClone) {
      foundRowFromClone.children = newChildren;
    }
  };

  const onChangeMenuItem = (e: string[]) => {
    console.log(e);
    const cloneShownMenu: IMenuItem[] = JSON.parse(JSON.stringify(shownMenu));

    menu.forEach((row) => {
      if (e.includes(row.key)) {
        if (row.children) {
          const newChildren: IMenuItem[] = row.children.map((child) => {
            return {
              ...child,
              children: child.children ? [] : null,
            };
          });
          addNewChildren(cloneShownMenu, row, newChildren);
        }
      } else {
        addNewChildren(cloneShownMenu, row, []);
      }
    });

    dispatch(setShownMenu(cloneShownMenu));
    dispatch(setDefaultOpenKeys(e));
  };

  console.log(shownMenu);

  return (
    <Menu
      items={searchValue.length ? filteredMenu : shownMenu}
      loadingMenu={loadingMenu}
      searchValue={searchValue}
      onSearch={onSearch}
      searchLoading={searchLoading}
      onSelectMenuItem={onSelectMenuItem}
      onChangeMenuItem={onChangeMenuItem}
      defaultOpenKeys={defaultOpenKeys}
      defaultSelectedKeys={defaultSelectedKeys}
    />
  );
};

export default MenuContainer;
