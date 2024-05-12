import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MenuItem } from "../../types/interfaces/MenuItem";

export interface IMenuSlice {
  menu: MenuItem[];
  loadingMenu: boolean;
}

const initialState: IMenuSlice = {
  menu: [],
  loadingMenu: false,
};

export const MenuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenu(state: IMenuSlice, action: PayloadAction<MenuItem[]>): void {
      state.menu = action.payload;
    },
    setLoadingMenu(state: IMenuSlice, action: PayloadAction<boolean>): void {
      state.loadingMenu = action.payload;
    },
  },
});

export const { setMenu, setLoadingMenu } = MenuSlice.actions;
export default MenuSlice.reducer;
