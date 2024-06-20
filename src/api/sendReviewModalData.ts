import { AxiosError } from "axios";
import { notification } from "antd";
import { requestToApi } from "../helpers/requestToApi";
import { IFormReviewModal } from "../types/interfaces/IScreenData";

export const sendReviewModalData = async (
  key: string,
  payload: IFormReviewModal
): Promise<number | undefined> => {
  try {
    const { status } = await requestToApi({
      url: `/api/menu/${key}/reviews`,
      method: "POST",
      data: payload,
    });

    return status;
  } catch (err) {
    const error = err as AxiosError<Error>;
    notification.error({
      message: "Error",
      description: error.message,
    });

    return undefined;
  }
};
