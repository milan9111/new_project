/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { Controller, FieldErrors } from "react-hook-form";
import { Input, Tooltip, DatePicker } from "antd";
import { IField } from "../../../types/interfaces/IScreenData";
import { EScreenFieldType } from "../../../types/enums/EScreenFieldType";
import { getAdditionalRules } from "../../../helpers/getAdditionalRules";
import {
  allowOnlyChar,
  allowOnlyNumber,
} from "../../../helpers/inputRestrictions";
import styles from "./customField.module.scss";

interface CustomFieldProps {
  item: IField;
  control: any;
  errors: FieldErrors<any>;
  onSearchByAttributeName: (attributeName: string | null, e: string) => void;
}

const CustomField: FC<CustomFieldProps> = ({
  item,
  control,
  errors,
  onSearchByAttributeName,
}) => {
  const { Search } = Input;

  const inputHandler = (
    type: EScreenFieldType,
    onChange: (...event: any[]) => void,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    switch (type) {
      case EScreenFieldType.Char:
        onChange(allowOnlyChar(e.target.value));
        break;
      case EScreenFieldType.Number:
        onChange(allowOnlyNumber(e.target.value));
        break;
      default:
        onChange(e.target.value);
        break;
    }
  };

  return (
    <>
      <div className={styles.inputBox}>
        <label htmlFor={item.attributeName || ""}>
          {item.name ? item.name : ""}
          {item.attribute?.required && (
            <span className={styles.required}>*</span>
          )}
        </label>
        <Controller
          name={item.attributeName || ""}
          control={control}
          rules={{
            required: item.attribute?.required || false,
            ...getAdditionalRules(item.type),
          }}
          render={({ field: { onChange, value } }) => (
            <Tooltip title={item.attribute?.comment || ""} color="geekblue">
              <div>
                {item.type === EScreenFieldType.Date ? (
                  <DatePicker
                    id={item.attributeName || ""}
                    className={styles.input}
                    onChange={onChange}
                    value={value}
                    placeholder={item.attributeName || ""}
                    format="MM/DD/YYYY"
                    status={errors[item.attributeName as string] ? "error" : ""}
                  />
                ) : item.key ? (
                  <Search
                    id={item.attributeName || ""}
                    className={styles.input}
                    onSearch={(e) => {
                      onSearchByAttributeName(item.attributeName, e);
                    }}
                    onChange={(e) => inputHandler(item.type, onChange, e)}
                    value={value}
                    placeholder={
                      item.attribute?.picture || item.attributeName || ""
                    }
                    maxLength={
                      item.type === EScreenFieldType.Char ? 1 : undefined
                    }
                    status={errors[item.attributeName as string] ? "error" : ""}
                  />
                ) : (
                  <Input
                    id={item.attributeName || ""}
                    className={styles.input}
                    onChange={(e) => inputHandler(item.type, onChange, e)}
                    value={value}
                    placeholder={
                      item.attribute?.picture || item.attributeName || ""
                    }
                    maxLength={
                      item.type === EScreenFieldType.Char ? 1 : undefined
                    }
                    status={errors[item.attributeName as string] ? "error" : ""}
                  />
                )}
              </div>
            </Tooltip>
          )}
        />
      </div>
      {errors[item.attributeName as string]?.type === "required" && (
        <div className={styles.errorMessage}>This field is required</div>
      )}
      {errors[item.attributeName as string]?.type === "pattern" ||
      errors[item.attributeName as string]?.type === "maxLength" ? (
        <div className={styles.errorMessage}>
          {errors[item.attributeName as string]?.message as string}
        </div>
      ) : null}
    </>
  );
};

export default CustomField;
