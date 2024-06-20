import { FC } from "react";
import { useParams } from "react-router-dom";
import ReviewDrawer from "./ReviewDrawer";
import { getReviews } from "../../store/actions/settingParamsActions";
import {
  setIsReviewDrawerOpen,
  setIsReviewModalOpen,
  setReviews,
} from "../../store/reducers/SettingParamsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import useAbortableEffect from "../../hooks/useAbortableEffect";

const ReviewDrawerContainer: FC = () => {
  const { isReviewDrawerOpen, reviews, loadingReviews } = useAppSelector(
    (state) => state.settingParams
  );
  const dispatch = useAppDispatch();
  const { key } = useParams();

  useAbortableEffect(
    async (abortController: AbortController) => {
      if (isReviewDrawerOpen) {
        dispatch(getReviews(key as string, abortController));
      } else {
        dispatch(setReviews([]));
      }
    },
    [isReviewDrawerOpen],
    []
  );

  console.log(reviews);

  const onCloseDrawer = () => {
    dispatch(setIsReviewDrawerOpen(false));
  };

  const onOpenReviewModal = () => {
    dispatch(setIsReviewModalOpen(true));
  };

  return (
    <ReviewDrawer
      isReviewDrawerOpen={isReviewDrawerOpen}
      onCloseDrawer={onCloseDrawer}
      onOpenReviewModal={onOpenReviewModal}
      loadingReviews={loadingReviews}
    />
  );
};

export default ReviewDrawerContainer;
