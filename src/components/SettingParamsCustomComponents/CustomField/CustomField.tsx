/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { DatePicker, Input, Tooltip } from "antd";
import { Controller, FieldErrors } from "react-hook-form";
import { IField } from "../../../types/interfaces/ISettingParams";
import styles from "./customField.module.scss";

interface CustomFieldProps {
  item: IField;
  control: any;
  errors: FieldErrors<any>;
}

const CustomField: FC<CustomFieldProps> = ({ item, control, errors }) => {
  return (
    <div className={styles.inputBox}>
      <Controller
        name={item.name || ""}
        control={control}
        rules={{
          required: item.required || false,
        }}
        render={({ field: { onChange, value } }) => (
          <Tooltip title={item.comments || ""} color="geekblue">
            <div>
              {item.dataType === "date" ? (
                <DatePicker
                  id={item.name}
                  className={styles.input}
                  onChange={onChange}
                  value={value}
                  format="MM/DD/YYYY"
                  status={errors[item.name] ? "error" : ""}
                />
              ) : (
                <Input
                  id={item.name}
                  className={styles.input}
                  onChange={(e) => onChange(e)}
                  value={value}
                  status={errors[item.name] ? "error" : ""}
                />
              )}
            </div>
          </Tooltip>
        )}
      />
      {errors[item.name]?.type === "required" && (
        <div className={styles.errorMessage}>This field is required</div>
      )}
    </div>
  );
};

export default CustomField;
