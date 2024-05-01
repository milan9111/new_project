/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { Controller, FieldErrors } from "react-hook-form";
import { Select, Tooltip } from "antd";
import { IScreenField } from "../../types/interfaces/IScreenData";
import styles from "./customSelect.module.scss";

interface CustomSelectProps {
  item: IScreenField;
  control: any;
  errors: FieldErrors<any>;
}

const CustomSelect: FC<CustomSelectProps> = ({ item, control, errors }) => {
  return (
    <div className={styles.selectBox}>
      <label htmlFor={item.AttributeName}>
        {item.Name ? item.Name.replace(/\./g, "") : ""}
      </label>
      <Controller
        name={item.AttributeName as string}
        control={control}
        rules={{
          required: item.Attribute?.Required || false,
        }}
        render={({ field }) => (
          <Tooltip title={item.Attribute?.Comment || ""} color="geekblue">
            <div>
              <Select
                id={item.AttributeName}
                className={styles.select}
                placeholder={item.AttributeName}
                defaultValue={item.Attribute?.DefaultValue || ""}
                {...field}
                suffixIcon={
                  item.Attribute?.Required && (
                    <span className={styles.required}>*</span>
                  )
                }
                status={errors.AttributeName ? "error" : ""}
                options={
                  item.Attribute?.Include &&
                  Array.isArray(item.Attribute.Include.string)
                    ? item.Attribute.Include.string.map((el) => ({
                        label: el,
                        value: el,
                      }))
                    : [
                        { label: "Option1", value: "option1" },
                        { label: "Option2", value: "option2" },
                      ]
                }
              />
            </div>
          </Tooltip>
        )}
      />
    </div>
  );
};

export default CustomSelect;