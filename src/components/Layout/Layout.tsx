import { FC, ReactNode } from "react";
import { Layout as AntdLayout, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import MenuContainer from "../Menu/MenuContainer";
import styles from "./layout.module.scss";

interface LayoutProps {
  children: ReactNode;
  loadingMenu: boolean;
}

const Layout: FC<LayoutProps> = ({ children, loadingMenu }) => {
  return (
    <AntdLayout className={styles.layout}>
      <Sider width={350} collapsible={!loadingMenu}>
        {loadingMenu && (
          <div className={styles.spinBox}>
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            />
          </div>
        )}
        <MenuContainer />
      </Sider>
      <Content className={styles.content}>
        <div className={styles.childrenWrapper}>{children}</div>
      </Content>
    </AntdLayout>
  );
};

export default Layout;
