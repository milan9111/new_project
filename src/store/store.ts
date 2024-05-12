import { configureStore } from "@reduxjs/toolkit";
import FormsReducer from "./reducers/FormsSlice";
import MenuReducer from "./reducers/MenuSlice";

export const store = configureStore({
  reducer: {
    forms: FormsReducer,
    menu: MenuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
