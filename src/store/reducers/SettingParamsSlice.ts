/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ICurrentSelectLookups,
  IReview,
  ISettingParamsItem,
} from "../../types/interfaces/ISettingParams";
import { ESettingParamsFieldType } from "../../types/enums/ESettingParamsFieldType";

export interface ISettingParamsSlice {
  settingParamsItem: ISettingParamsItem | null;
  loadingSettingParamsItem: boolean;
  isHelpModalOpen: boolean;
  selectedPath: string;
  currentSelectLookups: ICurrentSelectLookups | null;
  isReviewDrawerOpen: boolean;
  isReviewModalOpen: boolean;
  loadingReviewModal: boolean;
  reviews: IReview[];
  loadingReviews: boolean;
}

const initialState: ISettingParamsSlice = {
  settingParamsItem: null,
  loadingSettingParamsItem: false,
  isHelpModalOpen: false,
  selectedPath: "",
  currentSelectLookups: null,
  isReviewDrawerOpen: false,
  isReviewModalOpen: false,
  loadingReviewModal: false,
  reviews: [],
  loadingReviews: false,
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

      if (action.payload) {
        const tempCurrentSelectLookups: ICurrentSelectLookups = {};
        let index = 0;
        action.payload.form.rows.forEach((item) => {
          item.fields.forEach((el) => {
            if (el.fieldType === ESettingParamsFieldType.SelectLookup) {
              tempCurrentSelectLookups[el.name] = {
                index: index++,
                field: el.name,
                filters: el.filters,
                options: [],
                selectedValue: el.default || "",
                disabled: el.filters.length ? true : false,
              };
            }
          });
        });
        state.currentSelectLookups = tempCurrentSelectLookups;
      }
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
    setSelectedPath(
      state: ISettingParamsSlice,
      action: PayloadAction<string>
    ): void {
      state.selectedPath = action.payload;
    },
    setCurrentSelectLookups(
      state: ISettingParamsSlice,
      action: PayloadAction<ICurrentSelectLookups | null>
    ): void {
      state.currentSelectLookups = action.payload;
    },
    setIsReviewDrawerOpen(
      state: ISettingParamsSlice,
      action: PayloadAction<boolean>
    ): void {
      state.isReviewDrawerOpen = action.payload;
    },
    setIsReviewModalOpen(
      state: ISettingParamsSlice,
      action: PayloadAction<boolean>
    ): void {
      state.isReviewModalOpen = action.payload;
    },
    setLoadingReviewModal(
      state: ISettingParamsSlice,
      action: PayloadAction<boolean>
    ): void {
      state.loadingReviewModal = action.payload;
    },
    setReviews(
      state: ISettingParamsSlice,
      action: PayloadAction<IReview[]>
    ): void {
      state.reviews = action.payload;
    },
    setLoadingReviews(
      state: ISettingParamsSlice,
      action: PayloadAction<boolean>
    ): void {
      state.loadingReviews = action.payload;
    },
  },
});

export const {
  setSettingParamsItem,
  setLoadingSettingParamsItem,
  setIsHelpModalOpen,
  setSelectedPath,
  setCurrentSelectLookups,
  setIsReviewDrawerOpen,
  setIsReviewModalOpen,
  setLoadingReviewModal,
  setReviews,
  setLoadingReviews,
} = SettingParamsSlice.actions;
export default SettingParamsSlice.reducer;
