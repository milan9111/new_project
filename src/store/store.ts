import { configureStore } from "@reduxjs/toolkit";
import SignInReducer from './reducers/SignInSlice';
import FormsReducer from "./reducers/FormsSlice";
import MenuReducer from "./reducers/MenuSlice";


export const store = configureStore({
  reducer: {
    signIn: SignInReducer,
    forms: FormsReducer,
    menu: MenuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
