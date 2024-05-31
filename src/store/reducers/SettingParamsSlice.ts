/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISettingParamsItem } from "../../types/interfaces/ISettingParams";

export interface ISettingParamsSlice {
  settingParamsItem: ISettingParamsItem | null;
  loadingSettingParamsItem: boolean;
  isHelpModalOpen: boolean;
}

const initialState: ISettingParamsSlice = {
  settingParamsItem: null,
  loadingSettingParamsItem: false,
  isHelpModalOpen: false,
};

export const SettingParamsSlice = createSlice({
  name: "settingParams",
  initialState,
  reducers: {
    setSettingParamsItem(
      state: ISettingParamsSlice,
      action: PayloadAction<ISettingParamsItem | null>
    ): void {
      state.settingParamsItem = action.payload;
    },
    setLoadingSettingParamsItem(
      state: ISettingParamsSlice,
      action: PayloadAction<boolean>
    ): void {
      state.loadingSettingParamsItem = action.payload;
    },
    setIsHelpModalOpen(
      state: ISettingParamsSlice,
      action: PayloadAction<boolean>
    ): void {
      state.isHelpModalOpen = action.payload;
    },
  },
});

export const {
  setSettingParamsItem,
  setLoadingSettingParamsItem,
  setIsHelpModalOpen,
} = SettingParamsSlice.actions;
export default SettingParamsSlice.reducer;
