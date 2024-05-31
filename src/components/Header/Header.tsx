import { FC } from "react";
import { Avatar, Dropdown, MenuProps } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { getInitials } from "../../helpers/getInitials";
import styles from "./header.module.scss";

interface HeaderProps {
  items: MenuProps["items"];
  title: string;
  userName: string;
}

const Header: FC<HeaderProps> = ({ items, title, userName }) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
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
    </header>
  );
};

export default Header;
