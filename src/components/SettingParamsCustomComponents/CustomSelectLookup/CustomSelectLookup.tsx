/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { Select, Tooltip } from "antd";
import { Controller, FieldErrors } from "react-hook-form";
import {
  ICurrentSelectLookups,
  IField,
} from "../../../types/interfaces/ISettingParams";
import { setCurrentSelectLookups } from "../../../store/reducers/SettingParamsSlice";
import { useAppDispatch } from "../../../hooks/redux";
import styles from "./customSelectLookup.module.scss";

interface CustomSelectLookupProps {
  item: IField;
  control: any;
  options: { value: string; label: string }[];
  currentSelectLookups: ICurrentSelectLookups | null;
  errors: FieldErrors<any>;
}

const CustomSelectLookup: FC<CustomSelectLookupProps> = ({
  item,
  control,
  options,
  currentSelectLookups,
  errors,
}) => {
  const dispatch = useAppDispatch();

  const onChangeCurrentSelectLooks = (e: any, field: string) => {
    const tempCurrentSelectLookups = { ...currentSelectLookups };
    tempCurrentSelectLookups[field] = {
      ...tempCurrentSelectLookups[field],
      selectedValue: e,
    };
    dispatch(setCurrentSelectLookups(tempCurrentSelectLookups));
  };

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
                onChange={(e) => {
                  onChange(e);
                  onChangeCurrentSelectLooks(e, item.name);
                }}
                value={value}
                status={errors[item.name] ? "error" : ""}
                options={options}
                disabled={options.length === 0}
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
