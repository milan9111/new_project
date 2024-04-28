/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { Controller } from "react-hook-form";
import { Select } from "antd";
import { IScreenField } from "../../types/interfaces/IScreenData";
import styles from "./customSelect.module.scss";

interface CustomSelectProps {
  item: IScreenField;
  control: any;
}

const CustomSelect: FC<CustomSelectProps> = ({ item, control }) => {
  return (
    <div className={styles.selectBox}>
      <label htmlFor={item.AttributeName}>{item.Name || ''}</label>
      <Controller
        name={item.AttributeName as string}
        control={control}
        render={({ field }) => (
            <Select
              id={item.AttributeName}
              className={styles.select}
              placeholder={item.AttributeName}
              {...field}
              options={[
                {label: 'Option1', value: 'option1'},
                {label: 'Option2', value: 'option2'},
              ]}
            />
          )}
      />
    </div>
  );
};

export default CustomSelect;
