import { FC } from "react";
import { Modal } from "antd";
import styles from "./reportModal.module.scss";

interface ReportModalProps {
  isReportModalOpen: boolean;
  handleReportModalCancel: () => void;
  loadingReportModal: boolean;
}

const ReportModal: FC<ReportModalProps> = ({
  isReportModalOpen,
  handleReportModalCancel,
  loadingReportModal,
}) => {
  return (
     <Modal
      open={isReportModalOpen}
      onOk={handleReportModalCancel}
      okText="Run"
      onCancel={handleReportModalCancel}
      cancelButtonProps={{ style: { display: "none" } }}
      loading={loadingReportModal}
    >
        <div className={styles.rowsBox}>Report modal</div>
     
    </Modal>
  );
};

export default ReportModal;
