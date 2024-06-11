/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { Button, ConfigProvider, Spin } from "antd";
import { LoadingOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { SubmitHandler, UseFormHandleSubmit } from "react-hook-form";
import { ISettingParamsItem } from "../../types/interfaces/ISettingParams";
import styles from "./settingParams.module.scss";
import HelpModalContainer from "../../components/HelpModal/HelpModalContainer";

interface SettingParamsProps {
  loadingSettingParamsItem: boolean;
  settingParamsItem: ISettingParamsItem | null;
  onOpenHelpModal: () => void;
  goToFormsPage: () => void;
  renderForm: JSX.Element[];
  handleSubmit: UseFormHandleSubmit<any, undefined>;
  onSubmit: SubmitHandler<any>;
  formSubmit: React.MutableRefObject<HTMLButtonElement | null>;
  onFinishSetting: () => void;
}

const SettingParams: FC<SettingParamsProps> = ({
  loadingSettingParamsItem,
  settingParamsItem,
  onOpenHelpModal,
  goToFormsPage,
  renderForm,
  handleSubmit,
  onSubmit,
  formSubmit,
  onFinishSetting,
}) => {
  return (
    <ConfigProvider wave={{ disabled: true }}>
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />}
        spinning={loadingSettingParamsItem}
      >
        <section className={styles.settingParams}>
          {settingParamsItem ? (
            <div className={styles.container}>
              <div className={styles.menu}>
                <Button
                  onClick={() => onFinishSetting()}
                  disabled={!settingParamsItem.screenId}
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
              <p className={styles.execBin}>
                ExecBin: {settingParamsItem.execBin?.default || ""}
              </p>
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
          <HelpModalContainer />
        </section>
      </Spin>
    </ConfigProvider>
  );
};

export default SettingParams;
