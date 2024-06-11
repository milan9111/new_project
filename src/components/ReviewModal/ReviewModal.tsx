import { FC } from "react";
import { Modal } from "antd";

interface ReviewModalProps {
  isReviewModalOpen: boolean;
  handleReviewModalCancel: () => void;
}

const ReviewModal: FC<ReviewModalProps> = ({
  isReviewModalOpen,
  handleReviewModalCancel,
}) => {
  return (
    <Modal
      open={isReviewModalOpen}
      onOk={handleReviewModalCancel}
      okText="Save"
      onCancel={handleReviewModalCancel}
    >
      <div>Review modal</div>
    </Modal>
  );
};

export default ReviewModal;