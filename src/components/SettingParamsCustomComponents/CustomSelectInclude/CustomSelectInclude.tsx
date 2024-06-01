import { FC } from "react";
import { Select, Tooltip } from "antd";
import { IField } from "../../../types/interfaces/ISettingParams";
import styles from "./customSelectInclude.module.scss";

interface CustomSelectIncludeProps {
  item: IField;
}

const CustomSelectInclude: FC<CustomSelectIncludeProps> = ({ item }) => {
  return (
    <Tooltip title={item.comments || ""} color="geekblue">
      <Select id={item.name} className={styles.select} />
    </Tooltip>
  );
};

export default CustomSelectInclude;
