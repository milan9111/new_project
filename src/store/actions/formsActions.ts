import { AxiosError } from "axios";
import { notification } from "antd";
import { AppDispatch } from "../store";
import { IField } from "../../types/interfaces/IScreenData";
import { requestToApi } from "../../helpers/requestToApi";
import {
  setLoadingForm,
  setScreensNames,
  setSelectedScreen,
} from "../reducers/FormsSlice";

export const getScreens =
  (abortController: AbortController) =>
  async (dispatch: AppDispatch): Promise<string[] | []> => {
    dispatch(setLoadingForm(true));
    try {
      const { data, status } = await requestToApi({
        url: "/api/screens",
        abortController,
        config: {},
      });

      if (status === 200) {
        const { screens }: { screens: string[] } = data;
        dispatch(setScreensNames(screens));
        return screens;
      }

      dispatch(setLoadingForm(false));
      return [];
    } catch (err) {
      const error = err as AxiosError<Error>;
      notification.error({
        message: "Error",
        description: error.message,
      });
      dispatch(setLoadingForm(false));

      return [];
    }
  };

export const getScreen =
  (admit: string, abortController: AbortController) =>
  async (dispatch: AppDispatch): Promise<number | undefined> => {
    dispatch(setLoadingForm(true));
    try {
      const { data, status } = await requestToApi({
        url: `/api/screens/v1/${admit}`,
        abortController,
        config: {},
      });

      dispatch(setSelectedScreen(data));
      dispatch(setLoadingForm(false));

      return status;
    } catch (err) {
      const error = err as AxiosError<Error>;
      notification.error({
        message: "Error",
        description: error.message,
      });
      dispatch(setLoadingForm(false));

      return undefined;
    }
  };

export const getFieldsByAttributeName =
  (name: string | null, value: string, id: string) =>
  async (dispatch: AppDispatch): Promise<IField[]> => {
    dispatch(setLoadingForm(true));
    const payload = { name, value };
    try {
      const { data } = await requestToApi({
        url: `/api/screens/${id}`,
        method: "POST",
        data: payload,
        config: {},
      });

      const { fields }: { fields: IField[] } = data;

      return fields;
    } catch (err) {
      const error = err as AxiosError<Error>;
      notification.error({
        message: "Error",
        description: error.message,
      });
      dispatch(setLoadingForm(false));

      return [];
    }
  };
