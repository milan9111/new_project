import { FC } from "react";
import { setIsHelpModalOpen } from "../../store/reducers/SettingParamsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import HelpModal from "./HelpModal";
import styles from "./helpModal.module.scss";

const HelpModalContainer: FC = () => {
  const { settingParamsItem, isHelpModalOpen } = useAppSelector(
    (state) => state.settingParams
  );
  const dispatch = useAppDispatch();

  const handleHelpModalCancel = () => {
    dispatch(setIsHelpModalOpen(false));
  };

  const showRows = settingParamsItem?.help?.length
    ? settingParamsItem.help.map((item, index) => (
        <p key={index} className={styles.row}>
          {item}
        </p>
      ))
    : [];

  return (
    <HelpModal
      isHelpModalOpen={isHelpModalOpen}
      handleHelpModalCancel={handleHelpModalCancel}
      showRows={showRows}
    />
  );
};

export default HelpModalContainer;
