import { FC } from "react";
import { getReportModalData } from "../../store/actions/settingParamsActions";
import {
  setIsReportModalOpen,
  setReportModalItem,
} from "../../store/reducers/SettingParamsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import useAbortableEffect from "../../hooks/useAbortableEffect";
import ReportModal from "./ReportModal";

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

  return (
    <ReportModal
      isReportModalOpen={isReportModalOpen}
      handleReportModalCancel={handleReportModalCancel}
      loadingReportModal={loadingReportModal}
    />
  );
};

export default ReportModalContainer;
