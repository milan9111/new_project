/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { Controller, FieldErrors } from "react-hook-form";
import { Input, Tooltip, DatePicker } from "antd";
import { IField } from "../../types/interfaces/IScreenData";
import { EScreenFieldType } from "../../types/enums/EScreenFieldType";
import { getAdditionalRules } from "../../helpers/getAdditionalRules";
import styles from "./customField.module.scss";

interface CustomFieldProps {
  item: IField;
  control: any;
  errors: FieldErrors<any>;
}

const CustomField: FC<CustomFieldProps> = ({ item, control, errors }) => {
  return (
    <div className={styles.inputBox}>
      <label htmlFor={item.attributeName || ""}>
        {item.name ? item.name.replace(/\./g, "") : ""}
      </label>
      <Controller
        name={item.attributeName || ""}
        control={control}
        rules={{
          required: item.attribute?.required || false,
          ...getAdditionalRules(item.type),
        }}
        render={({ field }) => (
          <Tooltip title={item.attribute?.comment || ""} color="geekblue">
            <div>
              {item.type === EScreenFieldType.Date ? (
                <DatePicker
                  {...field}
                  id={item.attributeName || ""}
                  className={styles.input}
                  placeholder={item.attributeName || ""}
                  format="MM/DD/YYYY"
                  suffixIcon={
                    item.attribute?.required && (
                      <span className={styles.required}>*</span>
                    )
                  }
                  status={errors[item.attributeName as string] ? "error" : ""}
                />
              ) : (
                <Input
                  {...field}
                  id={item.attributeName || ""}
                  className={styles.input}
                  placeholder={item.attributeName || ""}
                  suffix={
                    item.attribute?.required && (
                      <span className={styles.required}>*</span>
                    )
                  }
                  status={errors[item.attributeName as string] ? "error" : ""}
                />
              )}
              {errors[item.attributeName as string]?.type === "required" && (
                <div className={styles.errorMessage}>
                  This field is required
                </div>
              )}
              {errors[item.attributeName as string]?.type === "pattern" ||
              errors[item.attributeName as string]?.type === "maxLength" ? (
                <div className={styles.errorMessage}>
                  {errors[item.attributeName as string]?.message as string}
                </div>
              ) : null}
            </div>
          </Tooltip>
        )}
      />
    </div>
  );
};

export default CustomField;
