/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMenuItem } from "../../types/interfaces/MenuItem";
import { searchMenuByLabel } from "../../helpers/searchMenuByLabel";

export interface IMenuSlice {
  menu: IMenuItem[];
  filteredMenu: IMenuItem[];
  shownMenu: IMenuItem[];
  loadingMenu: boolean;
  searchValue: string;
  searchLoading: boolean;
  defaultOpenKeys: string[];
  defaultSelectedKeys: string[];
}

const initialState: IMenuSlice = {
  menu: [],
  filteredMenu: [],
  shownMenu: [],
  loadingMenu: false,
  searchValue: "",
  searchLoading: false,
  defaultOpenKeys: [],
  defaultSelectedKeys: [],
};

export const MenuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenu(state: IMenuSlice, action: PayloadAction<IMenuItem[]>): void {
      state.menu = action.payload;

      const menu = [...action.payload];

      const shownMenu = menu.map((item) => {
        return {
          ...item,
          children: item.children ? [] : null,
        };
      });

      state.shownMenu = shownMenu;
    },
    setFilteredMenu(state: IMenuSlice): void {
      const menu = [...state.menu];
      state.filteredMenu = searchMenuByLabel(menu as any, state.searchValue);
    },
    setShownMenu(state: IMenuSlice, action: PayloadAction<IMenuItem[]>): void {
      state.shownMenu = action.payload;
    },
    setLoadingMenu(state: IMenuSlice, action: PayloadAction<boolean>): void {
      state.loadingMenu = action.payload;
    },
    setSearchValue(state: IMenuSlice, action: PayloadAction<string>): void {
      state.searchValue = action.payload;
    },
    setSearchLoading(state: IMenuSlice, action: PayloadAction<boolean>): void {
      state.searchLoading = action.payload;
    },
    setDefaultOpenKeys(
      state: IMenuSlice,
      action: PayloadAction<string[]>
    ): void {
      state.defaultOpenKeys = action.payload;
    },
    setDefaultSelectedKeys(
      state: IMenuSlice,
      action: PayloadAction<string[]>
    ): void {
      state.defaultSelectedKeys = action.payload;
    },
  },
});

export const {
  setMenu,
  setFilteredMenu,
  setShownMenu,
  setLoadingMenu,
  setSearchValue,
  setSearchLoading,
  setDefaultOpenKeys,
  setDefaultSelectedKeys,
} = MenuSlice.actions;
export default MenuSlice.reducer;
