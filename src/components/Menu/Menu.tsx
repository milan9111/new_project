import { FC } from "react";
import { Menu as MenuAntd } from "antd";
import { MenuItem } from "../../types/interfaces/MenuItem";

interface MenuProps {
  items: MenuItem[];
}

const Menu: FC<MenuProps> = ({ items }) => {
  return (
    <MenuAntd
      mode="inline"
      theme="dark"
      inlineIndent={10}
      subMenuCloseDelay={0}
      items={items}
    />
  );
};

export default Menu;
