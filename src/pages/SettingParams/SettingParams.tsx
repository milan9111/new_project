import { FC } from "react";
import { Button, ConfigProvider, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { ISettingParamsItem } from "../../types/interfaces/ISettingParams";
import styles from "./settingParams.module.scss";
import HelpModalContainer from "../../components/HelpModal/HelpModalContainer";

interface SettingParamsProps {
  loadingSettingParamsItem: boolean;
  settingParamsItem: ISettingParamsItem | null;
  onOpenHelpModal: () => void;
  goToFormsPage: () => void;
  renderForm: JSX.Element[];
}

const SettingParams: FC<SettingParamsProps> = ({
  loadingSettingParamsItem,
  settingParamsItem,
  onOpenHelpModal,
  goToFormsPage,
  renderForm,
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
                <Button>Finish (F9)</Button>
                <Button onClick={() => goToFormsPage()}>Cancel (ESC)</Button>
                {settingParamsItem?.help?.length ? (
                  <Button onClick={() => onOpenHelpModal()}>
                    Help (Alt+W)
                  </Button>
                ) : null}
              </div>
              <div
                className={styles.formBox}
                style={{
                  marginTop: `${settingParamsItem?.sizeOpt.y * 2}rem`,
                  marginLeft: `${settingParamsItem?.sizeOpt.x}rem`,
                  maxWidth: `${settingParamsItem?.sizeOpt.width * 2}rem`,
                  minHeight: `${settingParamsItem?.sizeOpt.height * 2}rem`,
                }}
              >
                {renderForm}
              </div>
            </div>
          ) : null}
          <HelpModalContainer />
        </section>
      </Spin>
    </ConfigProvider>
  );
};

export default SettingParams;
