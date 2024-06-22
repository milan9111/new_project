import { AxiosError } from "axios";
import { notification } from "antd";
import { requestToApi } from "../helpers/requestToApi";
import { IFormReviewModal, IReview } from "../types/interfaces/ISettingParams";

export const sendReviewModalData = async (
  key: string,
  payload: IFormReviewModal,
  parentReviewId: number
): Promise<{ status: number; review: IReview } | undefined> => {
  try {
    const { status, data } = await requestToApi({
      url: `/api/menu/${key}/reviews`,
      method: "POST",
      data: parentReviewId === 0 ? payload : { ...payload, parentReviewId },
    });

    return { status: status, review: data };
  } catch (err) {
    const error = err as AxiosError<Error>;
    notification.error({
      message: "Error",
      description: error.message,
    });

    return undefined;
  }
};
