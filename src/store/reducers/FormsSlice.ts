import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IScreen, ISelectScreen } from "../../types/interfaces/IScreenData";

export interface IFormsSlice {
  screensNamesForInput: ISelectScreen[];
  loadingForm: boolean;
  currentScreenIndex: number;
  maxScreenIndex: number;
  selectedScreen: IScreen | null;
  numberOfRowsWithoutRepeats: number[];
}

const initialState: IFormsSlice = {
  screensNamesForInput: [],
  loadingForm: false,
  currentScreenIndex: 0,
  maxScreenIndex: 0,
  selectedScreen: null,
  numberOfRowsWithoutRepeats: [],
};

export const FormsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    setScreensNamesForInput(
      state: IFormsSlice,
      action: PayloadAction<ISelectScreen[]>
    ): void {
      state.screensNamesForInput = action.payload;
    },
    setLoadingForm(state: IFormsSlice, action: PayloadAction<boolean>): void {
      state.loadingForm = action.payload;
    },
    setCurrentScreenIndex(
      state: IFormsSlice,
      action: PayloadAction<number>
    ): void {
      state.currentScreenIndex = action.payload;
    },
    setMaxScreenIndex(state: IFormsSlice, action: PayloadAction<number>): void {
      state.maxScreenIndex = action.payload;
    },
    setSelectedScreen(
      state: IFormsSlice,
      action: PayloadAction<IScreen | null>
    ): void {
      state.selectedScreen = action.payload;
    },
    setNumberOfRowsWithoutRepeats(
      state: IFormsSlice,
      action: PayloadAction<number[]>
    ): void {
      state.numberOfRowsWithoutRepeats = action.payload;
    },
  },
});

export const {
  setScreensNamesForInput,
  setLoadingForm,
  setCurrentScreenIndex,
  setMaxScreenIndex,
  setSelectedScreen,
  setNumberOfRowsWithoutRepeats,
} = FormsSlice.actions;
export default FormsSlice.reducer;
