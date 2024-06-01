import { FC } from "react";
import { Select, Tooltip } from "antd";
import { IField } from "../../../types/interfaces/ISettingParams";
import styles from "./customSelectLookup.module.scss";

interface CustomSelectLookupProps {
  item: IField;
}

const CustomSelectLookup: FC<CustomSelectLookupProps> = ({ item }) => {
  return (
    <Tooltip title={item.comments || ""} color="geekblue">
      <Select id={item.name} className={styles.select} />
    </Tooltip>
  );
};

export default CustomSelectLookup;
