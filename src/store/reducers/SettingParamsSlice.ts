/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ICurrentSelects,
  IReview,
  ISettingParamsItem,
  ReviewModalActionType,
} from "../../types/interfaces/ISettingParams";
import { ESettingParamsFieldType } from "../../types/enums/ESettingParamsFieldType";

export interface ISettingParamsSlice {
  settingParamsItem: ISettingParamsItem | null;
  loadingSettingParamsItem: boolean;
  isHelpModalOpen: boolean;
  selectedPath: string;
  currentSelects: ICurrentSelects | null;
  isReviewDrawerOpen: boolean;
  isReviewModalOpen: boolean;
  reviewModalAction: ReviewModalActionType;
  selectedParentReviewID: number;
  loadingReviewModal: boolean;
  reviews: IReview[];
  loadingReviews: boolean;
}

const initialState: ISettingParamsSlice = {
  settingParamsItem: null,
  loadingSettingParamsItem: false,
  isHelpModalOpen: false,
  selectedPath: "",
  currentSelects: null,
  isReviewDrawerOpen: false,
  isReviewModalOpen: false,
  reviewModalAction: "",
  selectedParentReviewID: 0,
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
        const tempCurrentSelects: ICurrentSelects = {};
        let index = 0;
        action.payload.form.rows.forEach((item) => {
          item.fields.forEach((el) => {
            if (
              el.fieldType === ESettingParamsFieldType.SelectLookup ||
              el.fieldType === ESettingParamsFieldType.SelectInclude
            ) {
              tempCurrentSelects[el.name] = {
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
        state.currentSelects = tempCurrentSelects;
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
    setCurrentSelects(
      state: ISettingParamsSlice,
      action: PayloadAction<ICurrentSelects | null>
    ): void {
      state.currentSelects = action.payload;
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
    setReviewModalAction(
      state: ISettingParamsSlice,
      action: PayloadAction<ReviewModalActionType>
    ): void {
      state.reviewModalAction = action.payload;
    },
    setSelectedParentReviewID(
      state: ISettingParamsSlice,
      action: PayloadAction<number>
    ): void {
      state.selectedParentReviewID = action.payload;
    },
    setLoadingReviewModal(
      state: ISettingParamsSlice,
      action: PayloadAction<boolean>
    ): void {
      state.loadingReviewModal = action.payload;
    },
    setReviews(
      state: ISettingParamsSlice,
      action: PayloadAction<IReview[] | IReview>
    ): void {
      if (Array.isArray(action.payload)) {
        state.reviews = action.payload;
      } else {
        state.reviews = [...state.reviews, action.payload];
      }
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
  setCurrentSelects,
  setIsReviewDrawerOpen,
  setIsReviewModalOpen,
  setReviewModalAction,
  setSelectedParentReviewID,
  setLoadingReviewModal,
  setReviews,
  setLoadingReviews,
} = SettingParamsSlice.actions;
export default SettingParamsSlice.reducer;
