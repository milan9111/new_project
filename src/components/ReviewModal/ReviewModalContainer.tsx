import { FC, useRef } from "react";
import { useForm } from "react-hook-form";
import { IFormReviewModal } from "../../types/interfaces/IScreenData";
import { sendReviewModalData } from "../../api/sendReviewModalData";
import {
  setIsReviewModalOpen,
  setLoadingReviewModal,
} from "../../store/reducers/FormsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import ReviewModal from "./ReviewModal";

const ReviewModalContainer: FC = () => {
  const {
    isReviewModalOpen,
    screensNamesForInput,
    currentScreenIndex,
    loadingReviewModal,
  } = useAppSelector((state) => state.forms);
  const dispatch = useAppDispatch();
  const formSubmit = useRef<HTMLButtonElement | null>(null);

  const {
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormReviewModal>({
    mode: "onBlur",
  });

  const onSubmit = async (data: IFormReviewModal) => {
    dispatch(setLoadingReviewModal(true));
    await sendReviewModalData(
      screensNamesForInput[currentScreenIndex].value,
      data
    );
    dispatch(setLoadingReviewModal(false));
    dispatch(setIsReviewModalOpen(false));
    reset();
  };

  const handleReviewModalCancel = () => {
    dispatch(setIsReviewModalOpen(false));
    reset();
  };

  const handleReviewModalSave = () => {
    if (formSubmit.current) {
      formSubmit.current?.click();
    }
  };

  return (
    <ReviewModal
      isReviewModalOpen={isReviewModalOpen}
      handleReviewModalCancel={handleReviewModalCancel}
      handleReviewModalSave={handleReviewModalSave}
      control={control}
      errors={errors}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      formSubmit={formSubmit}
      loadingReviewModal={loadingReviewModal}
    />
  );
};

export default ReviewModalContainer;
