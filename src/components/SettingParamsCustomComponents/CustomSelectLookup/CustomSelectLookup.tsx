/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from "react";
import { Select, Tooltip } from "antd";
import { Controller, FieldErrors, UseFormReset } from "react-hook-form";
import {
  ICurrentSelects,
  IField,
  IPayload,
} from "../../../types/interfaces/ISettingParams";
import { setCurrentSelects } from "../../../store/reducers/SettingParamsSlice";
import { useAppDispatch } from "../../../hooks/redux";
import useChangeCurrentSelect from "../../../hooks/useChangeCurrentSelect";
import styles from "./customSelectLookup.module.scss";
import { getSelectOptionsByPath } from "../../../api/getSelectOptionsByPath";

interface CustomSelectLookupProps {
  item: IField;
  control: any;
  options: { value: string; label: string }[];
  currentSelects: ICurrentSelects | null;
  selectedPath: string;
  defaultValues: Readonly<any> | undefined;
  reset: UseFormReset<any>;
  errors: FieldErrors<any>;
}

const CustomSelectLookup: FC<CustomSelectLookupProps> = ({
  item,
  control,
  options,
  currentSelects,
  selectedPath,
  defaultValues,
  reset,
  errors,
}) => {
  const [loadingOptions, setLoadingOptions] = useState<boolean>(false);
  const [isEmptyOptions, setIsEmptyOptions] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const onChangeCurrentSelect = useChangeCurrentSelect();

  const onFocusInput = async (
    currentSelects: ICurrentSelects | null,
    field: string
  ) => {
    if (currentSelects && !currentSelects[field].options.length) {
      setIsEmptyOptions(false);
      setLoadingOptions(true);

      const payload: IPayload[] = [];

      currentSelects[field].filters.forEach((item) => {
        if (currentSelects[item].selectedValue.length) {
          payload.push({
            fieldName: currentSelects[item].field,
            value: currentSelects[item].selectedValue,
          });
        }
      });

      const result = await getSelectOptionsByPath(selectedPath, field, payload);

      if (result?.length) {
        const tempCurrentSelects = { ...currentSelects };
        tempCurrentSelects[field] = {
          ...tempCurrentSelects[field],
          options: result,
        };
        dispatch(setCurrentSelects(tempCurrentSelects));
      } else {
        setIsEmptyOptions(true);
      }
      setLoadingOptions(false);
    }
  };

  const onChangeCurrentSelectLooks = (e: any, field: string) => {
    onChangeCurrentSelect(e, field, currentSelects, defaultValues, reset);
  };

  const getNotFoundContent = (
    isEmptyOptions: boolean,
    loadingOptions: boolean
  ) => {
    if (loadingOptions) {
      return <div>Loading...</div>;
    }
    if (isEmptyOptions) {
      return <div>There aren't options</div>;
    }
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
                  onChangeCurrentSelectLooks(e, item.name);
                }}
                onFocus={() => {
                  onFocusInput(currentSelects, item.name);
                }}
                value={value}
                status={errors[item.name] ? "error" : ""}
                options={options}
                loading={loadingOptions}
                disabled={
                  currentSelects ? currentSelects[item.name].disabled : true
                }
                notFoundContent={getNotFoundContent(
                  isEmptyOptions,
                  loadingOptions
                )}
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
