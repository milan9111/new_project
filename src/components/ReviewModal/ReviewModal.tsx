/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { Input, Modal } from "antd";
import {
  Controller,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";
import styles from "./reviewModal.module.scss";

interface ReviewModalProps {
  isReviewModalOpen: boolean;
  handleReviewModalCancel: () => void;
  handleReviewModalSave: () => void;
  control: any;
  errors: FieldErrors<any>;
  handleSubmit: UseFormHandleSubmit<any, undefined>;
  onSubmit: SubmitHandler<any>;
  formSubmit: React.MutableRefObject<HTMLButtonElement | null>;
  loadingReviewModal: boolean;
}

const ReviewModal: FC<ReviewModalProps> = ({
  isReviewModalOpen,
  handleReviewModalCancel,
  handleReviewModalSave,
  control,
  errors,
  handleSubmit,
  onSubmit,
  formSubmit,
  loadingReviewModal,
}) => {
  return (
    <Modal
      title="Review"
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
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  id="department"
                  className={styles.input}
                  onChange={(e) => onChange(e)}
                  value={value}
                  status={errors.department ? "error" : ""}
                />
              )}
            />
            {errors.department?.type === "required" && (
              <div className={styles.errorMessage}>This field is required</div>
            )}
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="userName">User name</label>
            <Controller
              name="userName"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  id="userName"
                  className={styles.input}
                  onChange={(e) => onChange(e)}
                  value={value}
                  status={errors.userName ? "error" : ""}
                />
              )}
            />
            {errors.userName?.type === "required" && (
              <div className={styles.errorMessage}>This field is required</div>
            )}
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="reasonForUse">Reason for use</label>
            <Controller
              name="reasonForUse"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  id="reasonForUse"
                  className={styles.input}
                  onChange={(e) => onChange(e)}
                  value={value}
                  status={errors.reasonForUse ? "error" : ""}
                />
              )}
            />
            {errors.reasonForUse?.type === "required" && (
              <div className={styles.errorMessage}>This field is required</div>
            )}
          </div>
          <button ref={formSubmit} className={styles.formSubmit}></button>
        </form>
      </div>
    </Modal>
  );
};

export default ReviewModal;
