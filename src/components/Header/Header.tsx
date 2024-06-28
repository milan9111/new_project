import { FC } from "react";
import { Avatar, Button, Dropdown, MenuProps } from "antd";
import { CaretDownOutlined, BarsOutlined } from "@ant-design/icons";
import { getInitials } from "../../helpers/getInitials";
import styles from "./header.module.scss";

interface HeaderProps {
  items: MenuProps["items"];
  title: string;
  userName: string;
  onShowMobileMenu: () => void;
}

const Header: FC<HeaderProps> = ({
  items,
  title,
  userName,
  onShowMobileMenu,
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Button
          className={styles.showMobileMenuButton}
          type="primary"
          onClick={onShowMobileMenu}
        >
          <BarsOutlined />
        </Button>
        <p className={styles.title}>{title}</p>
        <div className={styles.userBox}>
          <Avatar>{getInitials(userName)}</Avatar>
          <p className={styles.userName}>{userName}</p>
          <Dropdown menu={{ items }} trigger={["click"]}>
            <a onClick={(e) => e.preventDefault()}>
              <CaretDownOutlined />
            </a>
          </Dropdown>
        </div>
      </div>
      <p className={styles.mobileTitle}>{title}</p>
    </header>
  );
};

export default Header;
