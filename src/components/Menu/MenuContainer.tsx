/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { EPageRoute } from "../../types/enums/EPageRoute";
import { getMenu } from "../../store/actions/menuActions";
import {
  setDefaultOpenKeys,
  setDefaultSelectedKeys,
  setFilteredMenu,
  setSearchLoading,
  setSearchValue,
} from "../../store/reducers/MenuSlice";
import { debouncing } from "../../helpers/debouncing";
import useAbortableEffect from "../../hooks/useAbortableEffect";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import Menu from "./Menu";

const MenuContainer: FC = () => {
  const {
    menu,
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

  const onChangeMenuItem = (e: string[]) => {
    dispatch(setDefaultOpenKeys(e));
  };

  return (
    <Menu
      items={searchValue.length ? filteredMenu : menu}
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
