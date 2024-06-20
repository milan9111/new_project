import { AxiosError } from "axios";
import { notification } from "antd";
import { AppDispatch } from "../store";
import { requestToApi } from "../../helpers/requestToApi";
import {
  IReview,
  ISettingParamsItem,
} from "../../types/interfaces/ISettingParams";
import {
  setLoadingReviews,
  setLoadingSettingParamsItem,
  setReviews,
  setSettingParamsItem,
} from "../reducers/SettingParamsSlice";

export const getDataByKey =
  (key: string, abortController: AbortController) =>
  async (dispatch: AppDispatch): Promise<number | undefined> => {
    dispatch(setLoadingSettingParamsItem(true));
    try {
      const { data, status }: { data: ISettingParamsItem; status: number } =
        await requestToApi({
          url: `/api/menu/${key}`,
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

export const getReviews =
  (key: string, abortController: AbortController) =>
  async (dispatch: AppDispatch): Promise<number | undefined> => {
    dispatch(setLoadingReviews(true));
    try {
      const { data, status }: { data: IReview[]; status: number } =
        await requestToApi({
          url: `/api/menu/${key}/reviews`,
          abortController,
          config: {},
        });

      if (status === 200) {
        dispatch(setReviews(data));
      }

      setTimeout(() => {
        dispatch(setLoadingReviews(false));
      }, 500);

      return status;
    } catch (err) {
      const error = err as AxiosError<Error>;
      notification.error({
        message: "Error",
        description: error.message,
      });
      dispatch(setLoadingReviews(false));

      return undefined;
    }
  };
