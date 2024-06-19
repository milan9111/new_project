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
import { setSettingParamsItem } from "../../store/reducers/SettingParamsSlice";
import { debouncing } from "../../helpers/debouncing";
import useAbortableEffect from "../../hooks/useAbortableEffect";
import useCloneShowMenu from "../../hooks/useCloneShownMenu";
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
  const letShowMenuRecursion = useCloneShowMenu();
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
    dispatch(setSettingParamsItem(null));
    navigate(EPageRoute.SETTING_PARAMS_ROUTE.replace(":key", e.key));
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const onChangeMenuItem = (e: string[]) => {
    const cloneShownMenu: IMenuItem[] = JSON.parse(JSON.stringify(shownMenu));
    letShowMenuRecursion(menu, e, cloneShownMenu);
    dispatch(setShownMenu(cloneShownMenu));
    dispatch(setDefaultOpenKeys(e));
  };

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
