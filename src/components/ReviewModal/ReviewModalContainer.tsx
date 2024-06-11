import { FC } from "react";
import { setIsReviewModalOpen } from "../../store/reducers/FormsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import ReviewModal from "./ReviewModal";

const ReviewModalContainer: FC = () => {
  const { isReviewModalOpen } = useAppSelector(
    (state) => state.forms
  );
  const dispatch = useAppDispatch();

  const handleReviewModalCancel = () => {
    dispatch(setIsReviewModalOpen(false));
  };

  return (
    <ReviewModal
      isReviewModalOpen={isReviewModalOpen}
      handleReviewModalCancel={handleReviewModalCancel}
    />
  );
};

export default ReviewModalContainer;
