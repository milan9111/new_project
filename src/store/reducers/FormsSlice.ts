import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IScreen, ISelectScreens } from "../../types/interfaces/IScreenData";

export interface IFormsSlice {
  screensNames: string[];
  screensNamesForInput:  ISelectScreens[];
  loadingForm: boolean;
  currentScreenIndex: number;
  maxScreenIndex: number;
  selectedScreen: IScreen | null;
  numberOfRowsWithoutRepeats: number[];
}

const initialState: IFormsSlice = {
  screensNames: [],
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
    setScreensNames(state: IFormsSlice, action: PayloadAction<string[]>): void {
      state.screensNames = action.payload;
      
      if (action.payload.length) {
        state.maxScreenIndex = action.payload.length - 1;
        state.screensNamesForInput = action.payload.map((item, index) => ({
          label: item,
          value: index,
        }));
      }
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
  setScreensNames,
  setLoadingForm,
  setCurrentScreenIndex,
  setMaxScreenIndex,
  setSelectedScreen,
  setNumberOfRowsWithoutRepeats,
} = FormsSlice.actions;
export default FormsSlice.reducer;
