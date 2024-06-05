import { AxiosError } from "axios";
import { notification } from "antd";
import { requestToApi } from "../helpers/requestToApi";

export const getSelectOptionsByPath = async (
  path: string,
  field: string
): Promise<{ value: string; label: string }[] | undefined> => {
  const payload: [] = [];
  const config =
    path && field
      ? {
          params: {
            path,
            field,
          },
        }
      : {};
  try {
    const { data } = await requestToApi({
      url: `/api/menu/params/fieldData`,
      method: "POST",
      data: payload,
      config: {
        ...config,
      },
    });

    return data;
  } catch (err) {
    const error = err as AxiosError<Error>;
    notification.error({
      message: "Error",
      description: error.message,
    });

    return undefined;
  }
};
