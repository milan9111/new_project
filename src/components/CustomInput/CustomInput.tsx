/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { Controller, FieldErrors } from "react-hook-form";
import { Input, Tooltip } from "antd";
import { IField } from "../../types/interfaces/IScreenData";
import styles from "./customInput.module.scss";

interface CustomInputProps {
  item: IField;
  control: any;
  errors: FieldErrors<any>;
}

const CustomInput: FC<CustomInputProps> = ({ item, control, errors }) => {
  return (
    <div className={styles.inputBox}>
      <label htmlFor={item.attributeName || ""}>
        {item.name ? item.name.replace(/\./g, "") : ""}
      </label>
      <Controller
        name={item.attributeName as string}
        control={control}
        rules={{
          required: item.attribute?.required || false,
        }}
        render={({ field }) => (
          <Tooltip title={item.attribute?.comment || ""} color="geekblue">
            <div>
              <Input
                id={item.attributeName || ""}
                className={styles.input}
                placeholder={item.attributeName || ""}
                defaultValue={item.attribute?.defaultValue || ""}
                suffix={
                  item.attribute?.required && (
                    <span className={styles.required}>*</span>
                  )
                }
                status={errors[item.attributeName as string] ? "error" : ""}
                {...field}
              />
            </div>
          </Tooltip>
        )}
      />
    </div>
  );
};

export default CustomInput;
