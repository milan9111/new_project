import { FC } from "react";
import { Modal } from "antd";
import styles from "./reportModal.module.scss";

interface ReportModalProps {
  isReportModalOpen: boolean;
  handleReportModalCancel: () => void;
  loadingReportModal: boolean;
  renderForm: JSX.Element[];
}

const ReportModal: FC<ReportModalProps> = ({
  isReportModalOpen,
  handleReportModalCancel,
  loadingReportModal,
  renderForm,
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
      <div className={styles.container}>
        <div className={styles.formBox}>{renderForm}</div>
      </div>
    </Modal>
  );
};

export default ReportModal;
