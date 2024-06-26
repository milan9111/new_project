/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { Select, Tooltip } from "antd";
import { Controller, FieldErrors, UseFormReset } from "react-hook-form";
import {
  ICurrentSelects,
  IField,
} from "../../../types/interfaces/ISettingParams";
import styles from "./customSelectInclude.module.scss";
import useChangeCurrentSelect from "../../../hooks/useChangeCurrentSelect";

interface CustomSelectIncludeProps {
  item: IField;
  control: any;
  defaultValues: Readonly<any> | undefined;
  reset: UseFormReset<any>;
  currentSelects: ICurrentSelects | null;
  errors: FieldErrors<any>;
}

const CustomSelectInclude: FC<CustomSelectIncludeProps> = ({
  item,
  control,
  currentSelects,
  defaultValues,
  reset,
  errors,
}) => {
  const onChangeCurrentSelect = useChangeCurrentSelect();
  
  const onChangeCurrentSelectInclude = (e: any, field: string) => {
    onChangeCurrentSelect(e, field, currentSelects, defaultValues, reset);
  };

  return (
    <div className={styles.selectBox}>
      <label htmlFor={item.name || ""}>
        {item.label?.text ? item.label.text : ""}
        {item.required && <span className={styles.required}>*</span>}
      </label>
      <Controller
        name={item.name || ""}
        control={control}
        rules={{
          required: item.required || false,
        }}
        render={({ field: { value } }) => (
          <Tooltip title={item.comments || ""} color="geekblue">
            <div>
              <Select
                id={item.name}
                className={styles.select}
                onChange={(e) => {
                  onChangeCurrentSelectInclude(e, item.name);
                }}
                value={value}
                status={errors[item.name] ? "error" : ""}
                options={item.include.map((el) => ({ value: el, label: el }))}
              />
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

export default CustomSelectInclude;
