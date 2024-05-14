import { FC } from "react";
import Menu from "./Menu";
import {
  setFilteredMenu,
  setSearchLoading,
  setSearchValue,
} from "../../store/reducers/MenuSlice";
import { debouncing } from "../../helpers/debouncing";
import useAbortableEffect from "../../hooks/useAbortableEffect";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getMenu } from "../../store/actions/menuActions";

const MenuContainer: FC = () => {
  const { menu, loadingMenu, searchValue, searchLoading, filteredMenu } =
    useAppSelector((state) => state.menu);
  const dispatch = useAppDispatch();

  useAbortableEffect(
    async (abortController: AbortController) => {
      dispatch(getMenu(abortController));
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

  return (
    <Menu
      items={filteredMenu.length ? filteredMenu : menu}
      loadingMenu={loadingMenu}
      searchValue={searchValue}
      onSearch={onSearch}
      searchLoading={searchLoading}
    />
  );
};

export default MenuContainer;
