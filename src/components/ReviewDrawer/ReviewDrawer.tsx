import { FC } from "react";
import { Button, ConfigProvider, Drawer, Empty } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./reviewDrawer.module.scss";
import ReviewModalContainer from "../ReviewModal/ReviewModalContainer";

interface ReviewDrawerProps {
  isReviewDrawerOpen: boolean;
  onCloseDrawer: () => void;
  onOpenReviewModal: () => void;
  loadingReviews: boolean;
  showReviews: JSX.Element[];
  drawerEndRef: React.MutableRefObject<HTMLDivElement | null>;
}

const ReviewDrawer: FC<ReviewDrawerProps> = ({
  isReviewDrawerOpen,
  onCloseDrawer,
  onOpenReviewModal,
  loadingReviews,
  showReviews,
  drawerEndRef,
}) => {
  return (
    <ConfigProvider wave={{ disabled: true }}>
      <Drawer
        title="Reviews"
        onClose={() => onCloseDrawer()}
        open={isReviewDrawerOpen}
        size="large"
        loading={loadingReviews}
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => onOpenReviewModal()}
          >
            New review
          </Button>
        }
      >
        <div className={styles.container}>
          {showReviews.length ? (
            <div className={styles.reviewsBox}>
              {showReviews}
              <div ref={drawerEndRef} />
            </div>
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <div className={styles.empty}>There aren't reviews</div>
              }
            />
          )}
        </div>
        <ReviewModalContainer />
      </Drawer>
    </ConfigProvider>
  );
};

export default ReviewDrawer;
