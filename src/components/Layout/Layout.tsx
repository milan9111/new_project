import { FC, ReactNode } from "react";
import { Layout as AntdLayout, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import HeaderContainer from "../Header/HeaderContainer";
import MenuContainer from "../Menu/MenuContainer";
import FooterContainer from "../Footer/FooterContainer";
import styles from "./layout.module.scss";
import "./layout.scss";

interface LayoutProps {
  children: ReactNode;
  loadingMenu: boolean;
  loadingMainSpinner: boolean;
  onClearMenu: () => void;
}

const Layout: FC<LayoutProps> = ({
  children,
  loadingMenu,
  loadingMainSpinner,
  onClearMenu,
}) => {
  return (
    <Spin
      indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
      spinning={loadingMainSpinner}
      wrapperClassName="mainSpinWrapper"
      style={{ height: "100vh", maxHeight: "100vh" }}
    >
      <AntdLayout className={styles.layout}>
        <Sider
          width={350}
          collapsible={!loadingMenu}
          onCollapse={() => onClearMenu()}
        >
          {loadingMenu && (
            <div className={styles.spinBox}>
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
              />
            </div>
          )}
          <MenuContainer />
        </Sider>
        <div className={styles.contentBox}>
          <HeaderContainer />
          <Content className={styles.content}>
            <div className={styles.childrenWrapper}>{children}</div>
          </Content>
          <FooterContainer />
        </div>
      </AntdLayout>
    </Spin>
  );
};

export default Layout;
