/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISubMenuItem } from "../../types/interfaces/ISubMenu";

export interface ISubMenuSlice {
  subMenu: ISubMenuItem | null;
  loadingSubMenu: boolean;
}

const initialState: ISubMenuSlice = {
  subMenu: null,
  loadingSubMenu: false,
};

export const SubMenuSlice = createSlice({
  name: "subMenu",
  initialState,
  reducers: {
    setSubMenu(
      state: ISubMenuSlice,
      action: PayloadAction<ISubMenuItem | null>
    ): void {
      state.subMenu = action.payload;
    },
    setLoadingSubMenu(
      state: ISubMenuSlice,
      action: PayloadAction<boolean>
    ): void {
      state.loadingSubMenu = action.payload;
    },
  },
});

export const { setSubMenu, setLoadingSubMenu } = SubMenuSlice.actions;
export default SubMenuSlice.reducer;
