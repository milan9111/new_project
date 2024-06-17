import { FC, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { IFormReviewModal } from "../../types/interfaces/IScreenData";
import { sendReviewModalData } from "../../api/sendReviewModalData";
import {
  setIsReviewModalOpen,
  setLoadingReviewModal,
} from "../../store/reducers/SettingParamsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import ReviewModal from "./ReviewModal";

const ReviewModalContainer: FC = () => {
  const { isReviewModalOpen, loadingReviewModal } = useAppSelector(
    (state) => state.settingParams
  );
  const { screensNamesForInput, currentScreenIndex } = useAppSelector(
    (state) => state.forms
  );
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

  useEffect(() => {
    if (isReviewModalOpen) {
      const reviewModalString = localStorage.getItem("reviewModal");
      if (reviewModalString) {
        reset({ ...JSON.parse(reviewModalString), reasonForUse: "" });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReviewModalOpen]);

  const onSubmit = async (data: IFormReviewModal) => {
    dispatch(setLoadingReviewModal(true));

    const { department, userName } = data;
    localStorage.setItem(
      "reviewModal",
      JSON.stringify({ department, userName })
    );

    await sendReviewModalData(
      screensNamesForInput[currentScreenIndex].value,
      data
    );

    dispatch(setLoadingReviewModal(false));
    dispatch(setIsReviewModalOpen(false));
    reset({
      department: "",
      userName: "",
      reasonForUse: "",
    });
  };

  const handleReviewModalCancel = () => {
    dispatch(setIsReviewModalOpen(false));
    reset({
      department: "",
      userName: "",
      reasonForUse: "",
    });
  };

  const handleReviewModalSave = () => {
    if (formSubmit.current) {
      formSubmit.current?.click();
    }
  };

  const onClearLocalStorage = (value: string) => {
    const reviewModalString = localStorage.getItem("reviewModal");
    if (reviewModalString) {
      const newReviewModal = { ...JSON.parse(reviewModalString), [value]: "" };
      localStorage.setItem("reviewModal", JSON.stringify(newReviewModal));
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
      onClearLocalStorage={onClearLocalStorage}
      loadingReviewModal={loadingReviewModal}
    />
  );
};

export default ReviewModalContainer;
