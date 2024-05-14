/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MenuItem } from "../../types/interfaces/MenuItem";
import { searchMenuByLabel } from "../../helpers/searchMenuByLabel";

export interface IMenuSlice {
  menu: MenuItem[];
  filteredMenu: MenuItem[];
  loadingMenu: boolean;
  searchValue: string;
  searchLoading: boolean;
}

const initialState: IMenuSlice = {
  menu: [],
  filteredMenu: [],
  loadingMenu: false,
  searchValue: "",
  searchLoading: false,
};

export const MenuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenu(state: IMenuSlice, action: PayloadAction<MenuItem[]>): void {
      state.menu = action.payload;
    },
    setFilteredMenu(state: IMenuSlice): void {
      const menu = [...state.menu];
      state.filteredMenu = searchMenuByLabel(menu as any, state.searchValue);
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
  },
});

export const {
  setMenu,
  setFilteredMenu,
  setLoadingMenu,
  setSearchValue,
  setSearchLoading,
} = MenuSlice.actions;
export default MenuSlice.reducer;
