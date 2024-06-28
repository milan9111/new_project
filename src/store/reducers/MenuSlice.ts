/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMenuItem } from "../../types/interfaces/MenuItem";
import { searchMenuByLabel } from "../../helpers/searchMenuByLabel";

export interface IMenuSlice {
  menu: IMenuItem[];
  filteredMenu: IMenuItem[];
  shownMenu: IMenuItem[];
  loadingMenu: boolean;
  loadingMainSpinner: boolean;
  searchValue: string;
  searchLoading: boolean;
  defaultOpenKeys: string[];
  defaultSelectedKeys: string[];
  showMobileMenu: boolean;
}

const initialState: IMenuSlice = {
  menu: [],
  filteredMenu: [],
  shownMenu: [],
  loadingMenu: false,
  loadingMainSpinner: true,
  searchValue: "",
  searchLoading: false,
  defaultOpenKeys: [],
  defaultSelectedKeys: [],
  showMobileMenu: false,
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
    setLoadingMainSpinner(
      state: IMenuSlice,
      action: PayloadAction<boolean>
    ): void {
      state.loadingMainSpinner = action.payload;
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
    setShowMobileMenu(state: IMenuSlice, action: PayloadAction<boolean>): void {
      state.showMobileMenu = action.payload;
    },
  },
});

export const {
  setMenu,
  setFilteredMenu,
  setShownMenu,
  setLoadingMenu,
  setLoadingMainSpinner,
  setSearchValue,
  setSearchLoading,
  setDefaultOpenKeys,
  setDefaultSelectedKeys,
  setShowMobileMenu,
} = MenuSlice.actions;
export default MenuSlice.reducer;
