import { AxiosError } from "axios";
import { notification } from "antd";
import { AppDispatch } from "../store";
import { requestToApi } from "../../helpers/requestToApi";
import { ISettingParamsItem } from "../../types/interfaces/ISettingParams";
import {
  setLoadingSettingParamsItem,
  setSettingParamsItem,
} from "../reducers/SettingParamsSlice";

export const getDataByPath =
  (path: string, abortController: AbortController) =>
  async (dispatch: AppDispatch): Promise<number | undefined> => {
    dispatch(setLoadingSettingParamsItem(true));
    try {
      const { data, status }: { data: ISettingParamsItem; status: number } =
        await requestToApi({
          url: `/api/menu/params?path=${path}`,
          abortController,
          config: {},
        });

      if (status === 200) {
        dispatch(setSettingParamsItem(data));
      }

      setTimeout(() => {
        dispatch(setLoadingSettingParamsItem(false));
      }, 500);

      return status;
    } catch (err) {
      const error = err as AxiosError<Error>;
      notification.error({
        message: "Error",
        description: error.message,
      });
      dispatch(setLoadingSettingParamsItem(false));

      return undefined;
    }
  };
