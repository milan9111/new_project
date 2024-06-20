import { FC } from "react";
import { Button, ConfigProvider, Drawer } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./reviewDrawer.module.scss";
import ReviewModalContainer from "../ReviewModal/ReviewModalContainer";

interface ReviewDrawerProps {
  isReviewDrawerOpen: boolean;
  onCloseDrawer: () => void;
  onOpenReviewModal: () => void;
  loadingReviews: boolean;
}

const ReviewDrawer: FC<ReviewDrawerProps> = ({
  isReviewDrawerOpen,
  onCloseDrawer,
  onOpenReviewModal,
  loadingReviews,
}) => {
  return (
    <ConfigProvider wave={{ disabled: true }}>
      <Drawer
        title="Reviews"
        onClose={() => onCloseDrawer()}
        open={isReviewDrawerOpen}
        size="large"
        loading={loadingReviews}
      >
        <div className={styles.container}>
          <div className={styles.addButtonBox}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => onOpenReviewModal()}
            >
              New review
            </Button>
          </div>
        </div>
        <ReviewModalContainer />
      </Drawer>
    </ConfigProvider>
  );
};

export default ReviewDrawer;
