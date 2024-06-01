import { FC } from "react";
import { Input, Tooltip } from "antd";
import { IField } from "../../../types/interfaces/ISettingParams";
import styles from "./customField.module.scss";

interface CustomFieldProps {
  item: IField;
}

const CustomField: FC<CustomFieldProps> = ({ item }) => {
  return (
    <Tooltip title={item.comments || ""} color="geekblue">
      <Input id={item.name} className={styles.input} />
    </Tooltip>
  );
};

export default CustomField;
