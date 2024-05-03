import axios, { AxiosError } from "axios";
import { notification } from "antd";
import { IScreen } from "../types/interfaces/IScreenData";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getScreens = async (): Promise<string[] | []> => {
  try {
    const { data } = await instance.get("/api/screens");

    const { screens }: { screens: string[] } = data;

    return screens;
  } catch (err) {
    const error = err as AxiosError<Error>;
    notification.error({
      message: "Error",
      description: error.message,
    });

    return [];
  }
};

export const getScreen = async (admit: string): Promise<IScreen | null> => {
  try {
    const { data }: { data: IScreen } = await instance.get(
      `/api/screens/v1/${admit}`
    );

    return data;
  } catch (err) {
    const error = err as AxiosError<Error>;
    notification.error({
      message: "Error",
      description: error.message,
    });

    return null;
  }
};
