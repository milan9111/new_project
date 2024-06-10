import { AxiosError } from "axios";
import { notification } from "antd";
import { AppDispatch } from "../store";
import {
  IField,
  IResponseScreen,
  ISelectScreen,
} from "../../types/interfaces/IScreenData";
import { requestToApi } from "../../helpers/requestToApi";
import {
  setLoadingForm,
  setMaxScreenIndex,
  setScreensNamesForInput,
  setSelectedScreen,
} from "../reducers/FormsSlice";

export const getScreens =
  (abortController: AbortController) =>
  async (dispatch: AppDispatch): Promise<ISelectScreen[] | []> => {
    dispatch(setLoadingForm(true));
    try {
      const { data, status } = await requestToApi({
        url: "/api/screens",
        abortController,
        config: {},
      });

      if (status === 200) {
        const { screens }: { screens: IResponseScreen[] } = data;

        if (screens.length) {
          dispatch(setMaxScreenIndex(screens.length - 1));
          const screensNamesForInput = screens.map((item) => ({
            label: item.name.replace(/[-=]/g, ""),
            value: item.id,
          }));
          dispatch(setScreensNamesForInput(screensNamesForInput));

          return screensNamesForInput;
        }

        return [];
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
  (id: number, abortController: AbortController) =>
  async (dispatch: AppDispatch): Promise<number | undefined> => {
    dispatch(setLoadingForm(true));
    try {
      const { data, status } = await requestToApi({
        url: `/api/screens/v1/${id}`,
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
  (name: string | null, value: string, id: number) =>
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
