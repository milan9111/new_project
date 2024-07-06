import { FC } from "react";
import { ConfigProvider, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import styles from "./subMenu.module.scss";
import { ISubMenuItem } from "../../types/interfaces/ISubMenu";

interface SubMenuProps {
  loadingSubMenu: boolean;
  subMenu: ISubMenuItem | null;
  renderForm: JSX.Element[];
}

const SubMenu: FC<SubMenuProps> = ({ loadingSubMenu, subMenu, renderForm }) => {
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
            </div>
          ) : null}
        </section>
      </Spin>
    </ConfigProvider>
  );
};

export default SubMenu;
