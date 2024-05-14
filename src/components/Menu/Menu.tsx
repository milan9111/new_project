import { FC } from "react";
import { Input, Menu as MenuAntd, Spin } from "antd";
import { SearchOutlined, LoadingOutlined } from "@ant-design/icons";
import { MenuItem } from "../../types/interfaces/MenuItem";
import styles from "./menu.module.scss";

interface MenuProps {
  items: MenuItem[];
  loadingMenu: boolean;
  searchValue: string;
  onSearch: (value: string) => void;
  searchLoading: boolean;
}

const Menu: FC<MenuProps> = ({
  items,
  loadingMenu,
  searchValue,
  onSearch,
  searchLoading,
}) => {
  return (
    <div className={styles.container}>
      {!loadingMenu ? (
        <Input
          className={styles.input}
          allowClear
          value={searchValue}
          placeholder="Search"
          onChange={(e) => onSearch(e.target.value || "")}
          suffix={
            searchLoading ? (
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 14 }} spin />}
              />
            ) : (
              <SearchOutlined size={20} color="#292d3280" />
            )
          }
        />
      ) : null}
      <MenuAntd mode="inline" theme="dark" inlineIndent={10} items={items} />
    </div>
  );
};

export default Menu;
