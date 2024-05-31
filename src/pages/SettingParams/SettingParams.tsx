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
}

const SettingParams: FC<SettingParamsProps> = ({
  loadingSettingParamsItem,
  settingParamsItem,
  onOpenHelpModal,
}) => {
  return (
    <ConfigProvider wave={{ disabled: true }}>
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />}
        spinning={loadingSettingParamsItem}
      >
        <section className={styles.settingParams}>
          <div className={styles.container}>
            <div className={styles.menu}>
              <Button>Finish (F9)</Button>
              <Button>Cancel (ESC)</Button>
              {settingParamsItem?.help?.length ? (
                <Button onClick={() => onOpenHelpModal()}>Help (Alt+W)</Button>
              ) : null}
            </div>
          </div>
          <HelpModalContainer />
        </section>
      </Spin>
    </ConfigProvider>
  );
};

export default SettingParams;
