/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { Select, Tooltip } from "antd";
import { Controller, FieldErrors } from "react-hook-form";
import { IField } from "../../../types/interfaces/ISettingParams";
import styles from "./customSelectLookup.module.scss";

interface CustomSelectLookupProps {
  item: IField;
  control: any;
  errors: FieldErrors<any>;
}

const CustomSelectLookup: FC<CustomSelectLookupProps> = ({
  item,
  control,
  errors,
}) => {
  return (
    <div className={styles.selectBox}>
      <Controller
        name={item.name || ""}
        control={control}
        rules={{
          required: item.required || false,
        }}
        render={({ field: { onChange, value } }) => (
          <Tooltip title={item.comments || ""} color="geekblue">
            <div>
              <Select
                id={item.name}
                className={styles.select}
                onChange={(e) => onChange(e)}
                value={value}
                status={errors[item.name] ? "error" : ""}
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

export default CustomSelectLookup;
