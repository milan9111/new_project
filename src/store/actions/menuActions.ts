import { AxiosError } from "axios";
import { notification } from "antd";
import { AppDispatch } from "../store";
import { requestToApi } from "../../helpers/requestToApi";
import { setLoadingMenu, setMenu } from "../reducers/MenuSlice";
import { MenuItem } from "../../types/interfaces/MenuItem";

export const getMenu =
  (abortController: AbortController) =>
  async (dispatch: AppDispatch): Promise<MenuItem[] | []> => {
    dispatch(setLoadingMenu(true));
    try {
      const { data, status } = await requestToApi({
        url: "/api/menu",
        abortController,
        config: {},
      });

      if (status === 200) {
        dispatch(setMenu(data)); // we can use changeMenuLastChild func
        dispatch(setLoadingMenu(false));
        return data;
      }

      dispatch(setLoadingMenu(false));
      return [];
    } catch (err) {
      const error = err as AxiosError<Error>;
      notification.error({
        message: "Error",
        description: error.message,
      });
      dispatch(setLoadingMenu(false));

      return [];
    }
  };
