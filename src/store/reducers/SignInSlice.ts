import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISignedInUser } from "../../types/interfaces/ISignedInUser";

interface ISignInInitState {
  data: ISignedInUser;
  loading: boolean;
  error: string;
}

const initialState: ISignInInitState = {
  data: {
    token: "",
    name: "Jon Snow", // then ""
    email: "",
    id: "", 
  },
  loading: false,
  error: "",
};

export const SignInSlice = createSlice({
  name: "signIn",
  initialState,
  reducers: {
    loginFetching(state: ISignInInitState): void {
      state.loading = true;
    },
    loginFetchingSuccess(
      state: ISignInInitState,
      action: PayloadAction<ISignedInUser>
    ): void {
      state.loading = false;
      state.error = "";
      state.data = action.payload;
    },
    loginFetchingError(
      state: ISignInInitState,
      action: PayloadAction<string>
    ): void {
      state.loading = false;
      state.error = action.payload;
    },
    clearStateOnSignOut(state: ISignInInitState): void {
      state.loading = false;
      state.error = "";
      state.data = initialState.data;
    },
  },
});

export const { loginFetching, loginFetchingSuccess, clearStateOnSignOut } =
  SignInSlice.actions;
export default SignInSlice.reducer;
