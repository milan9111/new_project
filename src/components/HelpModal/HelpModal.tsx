import { FC } from "react";
import { Modal } from "antd";
import styles from "./helpModal.module.scss";

interface HelpModalProps {
  isHelpModalOpen: boolean;
  handleHelpModalCancel: () => void;
  showRows: JSX.Element[];
}

const HelpModal: FC<HelpModalProps> = ({
  isHelpModalOpen,
  handleHelpModalCancel,
  showRows,
}) => {
  return (
    <Modal
      open={isHelpModalOpen}
      onOk={handleHelpModalCancel}
      okText="Return"
      onCancel={handleHelpModalCancel}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <div className={styles.rowsBox}>{showRows}</div>
    </Modal>
  );
};

export default HelpModal;
