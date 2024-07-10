/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { Button, ConfigProvider, Badge, Spin } from "antd";
import { LoadingOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { SubmitHandler, UseFormHandleSubmit } from "react-hook-form";
import {
  IReview,
  ISettingParamsItem,
} from "../../types/interfaces/ISettingParams";
import styles from "./settingParams.module.scss";
import ReportModalContainer from "../../components/ReportModal/ReportModalContainer";
import HelpModalContainer from "../../components/HelpModal/HelpModalContainer";
import ReviewDrawerContainer from "../../components/ReviewDrawer/ReviewDrawerContainer";

interface SettingParamsProps {
  loadingSettingParamsItem: boolean;
  settingParamsItem: ISettingParamsItem | null;
  reviews: IReview[];
  onOpenHelpModal: () => void;
  goToFormsPage: () => void;
  onShowDrawer: () => void;
  renderForm: JSX.Element[];
  handleSubmit: UseFormHandleSubmit<any, undefined>;
  onSubmit: SubmitHandler<any>;
  formSubmit: React.MutableRefObject<HTMLButtonElement | null>;
  onFinishSetting: () => void;
}

const SettingParams: FC<SettingParamsProps> = ({
  loadingSettingParamsItem,
  settingParamsItem,
  reviews,
  onOpenHelpModal,
  goToFormsPage,
  onShowDrawer,
  renderForm,
  handleSubmit,
  onSubmit,
  formSubmit,
  onFinishSetting,
}) => {
  const getReviewCount = (
    settingParamsItem: ISettingParamsItem,
    reviews: IReview[]
  ): number => {
    if (reviews.length) {
      return reviews.length;
    }
    if (settingParamsItem?.reviewCount) {
      return settingParamsItem.reviewCount;
    } else {
      return 0;
    }
  };

  return (
    <ConfigProvider wave={{ disabled: true }}>
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />}
        spinning={loadingSettingParamsItem}
      >
        <section className={styles.settingParams}>
          {settingParamsItem && !loadingSettingParamsItem ? (
            <div className={styles.container}>
              <div className={styles.menu}>
                <div className={styles.leftButtons}>
                  <Button
                    onClick={() => onFinishSetting()}
                    disabled={
                      !settingParamsItem.hasSubMenu &&
                      !settingParamsItem.isReport
                    }
                  >
                    Finish (F9)
                  </Button>
                  <Button onClick={() => goToFormsPage()}>Cancel (ESC)</Button>
                  {settingParamsItem?.help?.length ? (
                    <Button onClick={() => onOpenHelpModal()}>
                      Help (Alt+W)
                    </Button>
                  ) : null}
                </div>
                <div className={styles.rightButtons}>
                  <Badge
                    count={getReviewCount(settingParamsItem, reviews)}
                    overflowCount={99}
                    color="#000c17"
                  >
                    <Button
                      type="primary"
                      style={{ width: "150px" }}
                      onClick={() => onShowDrawer()}
                    >
                      Reviews
                    </Button>
                  </Badge>
                </div>
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className={styles.formBox}
                style={{
                  marginTop: `${settingParamsItem?.sizeOpt.y * 2}rem`,
                  maxWidth: `${settingParamsItem?.sizeOpt.width}rem`,
                  minHeight: `${settingParamsItem?.sizeOpt.height * 2}rem`,
                }}
              >
                {renderForm}
                <button ref={formSubmit} className={styles.formSubmit}></button>
              </form>
              {localStorage.getItem("debug_mode") ? (
                <p className={styles.execBin}>
                  ExecBin: {settingParamsItem.execBin?.default || ""}
                </p>
              ) : null}
              {settingParamsItem.warn ? (
                <div className={styles.warnBox}>
                  <div className={styles.warnIcon}>
                    <InfoCircleOutlined
                      style={{ fontSize: 24, color: "#ffffff" }}
                    />
                  </div>
                  <p className={styles.warnText}>
                    {settingParamsItem.warn.default}
                  </p>
                </div>
              ) : null}
            </div>
          ) : null}
          <ReviewDrawerContainer />
          <ReportModalContainer />
          <HelpModalContainer />
        </section>
      </Spin>
    </ConfigProvider>
  );
};

export default SettingParams;
