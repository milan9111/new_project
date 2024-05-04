/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { Controller, FieldErrors } from "react-hook-form";
import { Select, Tooltip } from "antd";
import { IField } from "../../types/interfaces/IScreenData";
import styles from "./customSelect.module.scss";

interface CustomSelectProps {
  item: IField;
  control: any;
  errors: FieldErrors<any>;
}

const CustomSelect: FC<CustomSelectProps> = ({ item, control, errors }) => {
  return (
    <div className={styles.selectBox}>
      <label htmlFor={item.attributeName || ""}>
        {item.name ? item.name.replace(/\./g, "") : ""}
      </label>
      <Controller
        name={item.attributeName || ""}
        control={control}
        rules={{
          required: item.attribute?.required || false,
        }}
        render={({ field }) => (
          <Tooltip title={item.attribute?.comment || ""} color="geekblue">
            <div>
              <Select
                {...field}
                id={item.attributeName || ""}
                className={styles.select}
                placeholder={item.attributeName}
                suffixIcon={
                  item.attribute?.required && (
                    <span className={styles.required}>*</span>
                  )
                }
                status={errors.AttributeName ? "error" : ""}
                options={
                  item.attribute?.include &&
                  Array.isArray(item.attribute.include)
                    ? item.attribute.include.map(({ label, value }) => ({
                        label,
                        value,
                      }))
                    : [
                        { label: "Option1", value: "option1" },
                        { label: "Option2", value: "option2" },
                      ]
                }
              />
              {errors[item.attributeName as string]?.type === "required" && (
                <div className={styles.errorMessage}>
                  This field is required
                </div>
              )}
            </div>
          </Tooltip>
        )}
      />
    </div>
  );
};

export default CustomSelect;
