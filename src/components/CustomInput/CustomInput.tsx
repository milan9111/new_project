/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { Controller } from "react-hook-form";
import { Input } from "antd";
import { IScreenField } from "../../types/interfaces/IScreenData";
import styles from "./customInput.module.scss";

interface CustomInputProps {
  item: IScreenField;
  control: any;
}

const CustomInput: FC<CustomInputProps> = ({ item, control }) => {
  return (
    <div className={styles.inputBox}>
      <label htmlFor={item.AttributeName}>{item.Name || ''}</label>
      <Controller
        name={item.AttributeName as string}
        control={control}
        render={({ field }) => (
          <Input
            id={item.AttributeName}
            className={styles.input}
            placeholder={item.AttributeName}
            {...field}
          />
        )}
      />
    </div>
  );
};

export default CustomInput;
