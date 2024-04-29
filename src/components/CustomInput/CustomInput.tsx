/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { Controller, FieldErrors } from "react-hook-form";
import { Input, Tooltip } from "antd";
import { IScreenField } from "../../types/interfaces/IScreenData";
import styles from "./customInput.module.scss";

interface CustomInputProps {
  item: IScreenField;
  control: any;
  errors: FieldErrors<any>;
}

const CustomInput: FC<CustomInputProps> = ({ item, control, errors }) => {
  return (
    <div className={styles.inputBox}>
      <label htmlFor={item.AttributeName}>{item.Name || ""}</label>
      <Controller
        name={item.AttributeName as string}
        control={control}
        rules={{
          required: item.Attribute?.Required || false,
        }}
        render={({ field }) => (
          <Tooltip title={item.Attribute?.Comment || ""} color="geekblue">
            <div>
              <Input
                id={item.AttributeName}
                className={styles.input}
                placeholder={item.AttributeName}
                suffix={
                  item.Attribute?.Required && (
                    <span className={styles.required}>*</span>
                  )
                }
                status={errors[item.AttributeName as string] ? "error" : ""}
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
