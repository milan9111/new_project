import { AxiosError } from "axios";
import { notification } from "antd";
import { AppDispatch } from "../store";
import { setLoadingSubMenu, setSubMenu } from "../reducers/SubMenuSlice";
import { requestToApi } from "../../helpers/requestToApi";

export const getSubMenu =
  (abortController: AbortController, key: string) =>
  async (dispatch: AppDispatch): Promise<number | undefined> => {
    dispatch(setLoadingSubMenu(true));
    try {
      const { data, status } = await requestToApi({
        url: `/api/menu/${key}/submenu`,
        abortController,
        config: {},
      });

      if (status === 200) {
        dispatch(setSubMenu(data));
        dispatch(setLoadingSubMenu(false));
        return status;
      }

      dispatch(setLoadingSubMenu(false));
      return undefined;
    } catch (err) {
      const error = err as AxiosError<Error>;
      notification.error({
        message: "Error",
        description: error.message,
      });
      dispatch(setLoadingSubMenu(false));    

      return undefined;
    }
  };
