import { AxiosError } from "axios";
import { notification } from "antd";
import { AppDispatch } from "../store";
import { requestToApi } from "../../helpers/requestToApi";
import {
  setLoadingMainSpinner,
  setLoadingMenu,
  setMenu,
} from "../reducers/MenuSlice";
import { IMenuItem } from "../../types/interfaces/MenuItem";

export const getMenu =
  (abortController: AbortController) =>
  async (dispatch: AppDispatch): Promise<IMenuItem[] | []> => {
    dispatch(setLoadingMenu(true));
    try {
      const { data, status } = await requestToApi({
        url: "/api/menu",
        abortController,
        config: {},
      });

      if (status === 200) {
        dispatch(setMenu(data));
        dispatch(setLoadingMenu(false));
        dispatch(setLoadingMainSpinner(false));
        return data;
      }

      dispatch(setLoadingMenu(false));
      dispatch(setLoadingMainSpinner(false));
      return [];
    } catch (err) {
      const error = err as AxiosError<Error>;
      notification.error({
        message: "Error",
        description: error.message,
      });
      dispatch(setLoadingMenu(false));
      dispatch(setLoadingMainSpinner(false));

      return [];
    }
  };
