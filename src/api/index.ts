import axios, { AxiosError } from "axios";
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
    console.log(error.response?.data.message);

    return [];
  }
};

export const getScreen = async (
  admit: string
): Promise<IScreen | null> => {
  try {
    const { data } = await instance.get(`/api/screens/v1/${admit}`);

    const { Screen }: { Screen: IScreen } = data;

    return Screen;
  } catch (err) {
    const error = err as AxiosError<Error>;
    console.log(error.response?.data.message);

    return null;
  }
};
