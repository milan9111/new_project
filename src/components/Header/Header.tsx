import { FC } from "react";
import { Avatar, Dropdown, MenuProps } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import styles from "./header.module.scss";

interface HeaderProps {
  items: MenuProps["items"];
  formName: string;
}

const Header: FC<HeaderProps> = ({ items, formName }) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <p className={styles.formName}>{formName}</p>
        <div className={styles.userBox}>
          <Avatar>J.S.</Avatar>
          <p className={styles.userName}>Jon Snow</p>
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
