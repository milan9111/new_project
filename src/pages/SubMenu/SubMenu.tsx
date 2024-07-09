import { FC } from "react";
import { ConfigProvider, Spin } from "antd";
import { LoadingOutlined, InfoCircleOutlined } from "@ant-design/icons";
import styles from "./subMenu.module.scss";
import { ISubMenuItem } from "../../types/interfaces/ISubMenu";

interface SubMenuProps {
  loadingSubMenu: boolean;
  subMenu: ISubMenuItem | null;
  renderForm: JSX.Element[];
  lastInputFocus: boolean;
}

const SubMenu: FC<SubMenuProps> = ({
  loadingSubMenu,
  subMenu,
  renderForm,
  lastInputFocus,
}) => {
  return (
    <ConfigProvider wave={{ disabled: true }}>
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />}
        spinning={loadingSubMenu}
      >
        <section className={styles.subMenu}>
          {subMenu && !loadingSubMenu ? (
            <div className={styles.container}>
              <div
                className={styles.formBox}
                style={{
                  marginTop: `${subMenu?.sizeOpt.y * 2}rem`,
                  maxWidth: `${subMenu?.sizeOpt.width}rem`,
                  minHeight: `${subMenu?.sizeOpt.height * 2}rem`,
                }}
              >
                {renderForm}
              </div>
              {subMenu.form.rows[subMenu.form.rows.length - 1].fields[1]
                .comments ? (
                <div
                  className={styles.warnBox}
                  style={lastInputFocus ? { opacity: 1 } : { opacity: 0 }}
                >
                  <div className={styles.warnIcon}>
                    <InfoCircleOutlined
                      style={{ fontSize: 24, color: "#ffffff" }}
                    />
                  </div>
                  <p className={styles.warnText}>
                    {
                      subMenu.form.rows[subMenu.form.rows.length - 1].fields[1]
                        .comments
                    }
                  </p>
                </div>
              ) : null}
            </div>
          ) : null}
        </section>
      </Spin>
    </ConfigProvider>
  );
};

export default SubMenu;
