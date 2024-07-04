import { configureStore } from "@reduxjs/toolkit";
import SignInReducer from "./reducers/SignInSlice";
import FormsReducer from "./reducers/FormsSlice";
import MenuReducer from "./reducers/MenuSlice";
import SettingParamsReducer from "./reducers/SettingParamsSlice";
import SubMenuReducer from "./reducers/SubMenuSlice";

export const store = configureStore({
  reducer: {
    signIn: SignInReducer,
    forms: FormsReducer,
    menu: MenuReducer,
    settingParams: SettingParamsReducer,
    subMenu: SubMenuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
