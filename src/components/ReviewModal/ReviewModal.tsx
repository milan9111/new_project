/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { Input, Modal } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";
import {
  Controller,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";
import { ReviewModalActionType } from "../../types/interfaces/ISettingParams";
import styles from "./reviewModal.module.scss";

interface ReviewModalProps {
  isReviewModalOpen: boolean;
  reviewModalAction: ReviewModalActionType;
  handleReviewModalCancel: () => void;
  handleReviewModalSave: () => void;
  control: any;
  errors: FieldErrors<any>;
  handleSubmit: UseFormHandleSubmit<any, undefined>;
  onSubmit: SubmitHandler<any>;
  formSubmit: React.MutableRefObject<HTMLButtonElement | null>;
  onClearLocalStorage: (value: string) => void;
  loadingReviewModal: boolean;
}

const ReviewModal: FC<ReviewModalProps> = ({
  isReviewModalOpen,
  reviewModalAction,
  handleReviewModalCancel,
  handleReviewModalSave,
  control,
  errors,
  handleSubmit,
  onSubmit,
  formSubmit,
  onClearLocalStorage,
  loadingReviewModal,
}) => {
  const { TextArea } = Input;

  return (
    <Modal
      title={reviewModalAction === "New" ? "Review" : "Reply"}
      open={isReviewModalOpen}
      onOk={handleReviewModalSave}
      okText="Save"
      onCancel={handleReviewModalCancel}
      confirmLoading={loadingReviewModal}
    >
      <div className={styles.reviewModal}>
        <form className={styles.reviewForm} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputBox}>
            <label htmlFor="department">Department</label>
            <Controller
              name="department"
              control={control}
              rules={{
                required: true,
                minLength: 1,
                pattern: /^(?!\s*$).+/,
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  id="department"
                  className={styles.input}
                  onChange={(e) => onChange(e)}
                  value={value}
                  status={errors.department ? "error" : ""}
                  allowClear={{
                    clearIcon: (
                      <CloseCircleFilled
                        style={{ color: "#ff000080" }}
                        onClick={() => onClearLocalStorage("department")}
                      />
                    ),
                  }}
                />
              )}
            />
            {errors.department?.type === "required" && (
              <div className={styles.errorMessage}>This field is required</div>
            )}
            {errors.department?.type === "pattern" && (
              <div className={styles.errorMessage}>This field is empty</div>
            )}
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="userName">User name</label>
            <Controller
              name="userName"
              control={control}
              rules={{
                required: true,
                minLength: 1,
                pattern: /^(?!\s*$).+/,
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  id="userName"
                  className={styles.input}
                  onChange={(e) => onChange(e)}
                  value={value}
                  status={errors.userName ? "error" : ""}
                  allowClear={{
                    clearIcon: (
                      <CloseCircleFilled
                        style={{ color: "#ff000080" }}
                        onClick={() => onClearLocalStorage("userName")}
                      />
                    ),
                  }}
                />
              )}
            />
            {errors.userName?.type === "required" && (
              <div className={styles.errorMessage}>This field is required</div>
            )}
            {errors.userName?.type === "pattern" && (
              <div className={styles.errorMessage}>This field is empty</div>
            )}
          </div>
          <div className={styles.textareaBox}>
            <label htmlFor="reasonForUse">
              {reviewModalAction === "New" ? "Reason for use" : "Message"}
            </label>
            <Controller
              name="reasonForUse"
              control={control}
              rules={{
                required: true,
                minLength: 1,
                pattern: /^(?!\s*$).+/,
              }}
              render={({ field: { onChange, value } }) => (
                <TextArea
                  id="reasonForUse"
                  className={styles.textarea}
                  style={{ height: 120, resize: "none" }}
                  onChange={(e) => onChange(e)}
                  value={value}
                  status={errors.reasonForUse ? "error" : ""}
                />
              )}
            />
            {errors.reasonForUse?.type === "required" && (
              <div className={styles.errorMessage}>This field is required</div>
            )}
            {errors.reasonForUse?.type === "pattern" && (
              <div className={styles.errorMessage}>This field is empty</div>
            )}
          </div>
          <button ref={formSubmit} className={styles.formSubmit}></button>
        </form>
      </div>
    </Modal>
  );
};

export default ReviewModal;
