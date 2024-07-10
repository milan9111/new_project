import { FC } from "react";
import { Button, Input, Tooltip } from "antd";
import { IField } from "../../types/interfaces/IReportModalItem";
import { EReportModalFieldType } from "../../types/enums/EReportModalFieldType";
import { getReportModalData } from "../../store/actions/settingParamsActions";
import {
  setIsReportModalOpen,
  setReportModalItem,
} from "../../store/reducers/SettingParamsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import useAbortableEffect from "../../hooks/useAbortableEffect";
import ReportModal from "./ReportModal";
import styles from "./reportModal.module.scss";

const ReportModalContainer: FC = () => {
  const { isReportModalOpen, reportModalItem, loadingReportModal } =
    useAppSelector((state) => state.settingParams);
  const dispatch = useAppDispatch();

  const handleCleanup = () => {
    dispatch(setReportModalItem(null));
  };

  useAbortableEffect(
    async (abortController: AbortController) => {
      if (isReportModalOpen) {
        dispatch(getReportModalData(abortController));
      }
    },
    [isReportModalOpen],
    [handleCleanup]
  );

  console.log(reportModalItem);

  const handleReportModalCancel = () => {
    dispatch(setIsReportModalOpen(false));
  };

  const renderRow = (fields: IField[]) => {
    if (fields.length) {
      const createdRow = fields.map((item, index) => {
        if (item.rowItemType === EReportModalFieldType.Label) {
          if (fields.length === 0) {
            return null;
          }
          if (fields.length === 1) {
            return (
              <p
                key={index}
                className={
                  item.column !== 0
                    ? styles.titleRowCenter
                    : styles.titleRowStart
                }
              >
                {item.text}
              </p>
            );
          }
          if (fields.length > 1) {
            return (
              <p key={index} className={styles.label}>
                {item.text}
              </p>
            );
          }
        }
        if (item.rowItemType === EReportModalFieldType.Button) {
          return (
            <Button key={index} type="primary" onClick={() => {}}>
              {item.text}
            </Button>
          );
        }
        if (item.rowItemType === EReportModalFieldType.Field) {
          return (
            <div key={index} className={styles.selectionInput}>
              <Tooltip title={item.comments || ""} color="geekblue">
                <Input />
              </Tooltip>
            </div>
          );
        }
      });
      return createdRow;
    } else {
      return <div className={styles.emptyRow}></div>;
    }
  };

  const renderForm =
    !loadingReportModal && reportModalItem
      ? reportModalItem.form.rows.map((item) => {
          return (
            <div key={item.row} className={styles.row}>
              {renderRow(item.fields)}
            </div>
          );
        })
      : [];

  return (
    <ReportModal
      isReportModalOpen={isReportModalOpen}
      handleReportModalCancel={handleReportModalCancel}
      loadingReportModal={loadingReportModal}
      renderForm={renderForm}
    />
  );
};

export default ReportModalContainer;
