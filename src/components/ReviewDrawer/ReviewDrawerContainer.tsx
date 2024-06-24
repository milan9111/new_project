import { FC, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Button } from "antd";
import { CommentOutlined } from "@ant-design/icons";
import { getReviews } from "../../store/actions/settingParamsActions";
import {
  setIsReviewDrawerOpen,
  setIsReviewModalOpen,
  setReviewModalAction,
  setSelectedParentReviewID,
} from "../../store/reducers/SettingParamsSlice";
import { formatDateReview } from "../../helpers/formatDate";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import useAbortableEffect from "../../hooks/useAbortableEffect";
import ReviewDrawer from "./ReviewDrawer";
import styles from "./reviewDrawer.module.scss";

const ReviewDrawerContainer: FC = () => {
  const { isReviewDrawerOpen, reviews, loadingReviews } = useAppSelector(
    (state) => state.settingParams
  );
  const dispatch = useAppDispatch();
  const { key } = useParams();
  const drawerEndRef = useRef<HTMLDivElement | null>(null);

  useAbortableEffect(
    async (abortController: AbortController) => {
      if (isReviewDrawerOpen) {
        dispatch(getReviews(key as string, abortController));
      }
    },
    [isReviewDrawerOpen],
    []
  );

  useEffect(() => {
    if (isReviewDrawerOpen && !loadingReviews) {
      scrollToBottom();
    }
  }, [isReviewDrawerOpen, loadingReviews, reviews]);

  const onCloseDrawer = () => {
    dispatch(setIsReviewDrawerOpen(false));
  };

  const onOpenReviewModal = (id?: number) => {
    if (id) {
      dispatch(setSelectedParentReviewID(id));
      dispatch(setReviewModalAction("Reply"));
    } else {
      dispatch(setReviewModalAction("New"));
    }
    dispatch(setIsReviewModalOpen(true));
  };

  const scrollToBottom = () => {
    drawerEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const onScrollToParentReview = (id: string) => {
    const review = document.getElementById(id);
    if (review) {
      review.classList.add(`${styles.foundedParentReview}`);
      setTimeout(() => {
        review.classList.remove(`${styles.foundedParentReview}`);
      }, 1000);
      review.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  };

  const showReviews = reviews.map((item) => {
    return (
      <div key={item.id} id={`review-${item.id}`} className={styles.review}>
        {item.parentReviewId ? (
          <div
            className={styles.parentReview}
            onClick={() =>
              onScrollToParentReview(`review-${item.parentReviewId}`)
            }
          >
            <p className={styles.parentReviewUserName}>
              {reviews.find((el) => el.id === item.parentReviewId)?.userName ||
                ""}
            </p>
            <p className={styles.parentReviewText}>
              {`${reviews
                .find((el) => el.id === item.parentReviewId)
                ?.reasonForUse.slice(0, 24)}...` || "..."}
            </p>
          </div>
        ) : null}

        <div className={styles.reviewNameDateBox}>
          <div className={styles.reviewName}>
            <span>User name:</span>
            <p>{item.userName}</p>
          </div>
          <div className={styles.reviewDate}>
            <span>Date:</span>
            <p>{formatDateReview(item.date)}</p>
          </div>
        </div>
        <div className={styles.reviewDepartment}>
          <span>Department:</span>
          <p>{item.department}</p>
        </div>
        <p className={styles.reviewText}>{item.reasonForUse}</p>
        <div className={styles.reviewButtonBox}>
          <Button
            type="primary"
            icon={<CommentOutlined />}
            onClick={() => onOpenReviewModal(item.id)}
          >
            Reply
          </Button>
        </div>
      </div>
    );
  });

  return (
    <ReviewDrawer
      isReviewDrawerOpen={isReviewDrawerOpen}
      onCloseDrawer={onCloseDrawer}
      onOpenReviewModal={onOpenReviewModal}
      loadingReviews={loadingReviews}
      showReviews={showReviews}
      drawerEndRef={drawerEndRef}
    />
  );
};

export default ReviewDrawerContainer;
