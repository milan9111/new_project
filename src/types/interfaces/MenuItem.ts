import type { MenuProps } from "antd";

export type MenuItem = Required<MenuProps>["items"][number];

export interface IMenuItem {
  key: string;
  label: string;
  children: IMenuItem[] | null;
  path: string;
}
