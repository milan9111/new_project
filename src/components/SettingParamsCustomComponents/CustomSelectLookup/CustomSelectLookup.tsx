/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from "react";
import { Select, Tooltip } from "antd";
import { Controller, FieldErrors, UseFormReset } from "react-hook-form";
import {
  ICurrentSelectLookups,
  IField,
  IPayload,
} from "../../../types/interfaces/ISettingParams";
import { setCurrentSelectLookups } from "../../../store/reducers/SettingParamsSlice";
import { useAppDispatch } from "../../../hooks/redux";
import styles from "./customSelectLookup.module.scss";
import { getSelectOptionsByPath } from "../../../api/getSelectOptionsByPath";

interface CustomSelectLookupProps {
  item: IField;
  control: any;
  options: { value: string; label: string }[];
  currentSelectLookups: ICurrentSelectLookups | null;
  selectedPath: string;
  defaultValues: Readonly<any> | undefined;
  reset: UseFormReset<any>;
  errors: FieldErrors<any>;
}

const CustomSelectLookup: FC<CustomSelectLookupProps> = ({
  item,
  control,
  options,
  currentSelectLookups,
  selectedPath,
  defaultValues,
  reset,
  errors,
}) => {
  const [loadingOptions, setLoadingOptions] = useState<boolean>(false);
  const [isEmptyOptions, setIsEmptyOptions] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const onFocusInput = async (
    currentSelectLookups: ICurrentSelectLookups | null,
    field: string
  ) => {
    if (currentSelectLookups && !currentSelectLookups[field].options.length) {
      setIsEmptyOptions(false);
      setLoadingOptions(true);

      const payload: IPayload[] = [];

      currentSelectLookups[field].filters.forEach((item) => {
        if (currentSelectLookups[item].selectedValue.length) {
          payload.push({
            fieldName: currentSelectLookups[item].field,
            value: currentSelectLookups[item].selectedValue,
          });
        }
      });

      const result = await getSelectOptionsByPath(selectedPath, field, payload);

      if (result?.length) {
        const tempCurrentSelectLookups = { ...currentSelectLookups };
        tempCurrentSelectLookups[field] = {
          ...tempCurrentSelectLookups[field],
          options: result,
        };
        dispatch(setCurrentSelectLookups(tempCurrentSelectLookups));
      } else {
        setIsEmptyOptions(true);
      }
      setLoadingOptions(false);
    }
  };

  const onChangeCurrentSelectLooks = (e: any, field: string) => {
    // add new value
    const tempCurrentSelectLookups = { ...currentSelectLookups };
    tempCurrentSelectLookups[field] = {
      ...tempCurrentSelectLookups[field],
      selectedValue: e,
    };

    // cleaning depends on filters
    for (const value of Object.values(tempCurrentSelectLookups)) {
      if (value.filters.includes(field)) {
        tempCurrentSelectLookups[value.field] = {
          ...tempCurrentSelectLookups[value.field],
          options: [],
          selectedValue: "",
          disabled: true,
        };
      }
    }

    // disabled or not
    const activeFilters: string[] = [];
    for (const value of Object.values(tempCurrentSelectLookups)) {
      if (value.selectedValue) {
        activeFilters.push(value.field);
      }
    }

    for (const value of Object.values(tempCurrentSelectLookups)) {
      const valueFilters = [...value.filters];
      activeFilters.forEach((item) => {
        const index = valueFilters.indexOf(item);
        if (index !== -1) {
          valueFilters.splice(index, 1);
        }
      });
      tempCurrentSelectLookups[value.field] = {
        ...tempCurrentSelectLookups[value.field],
        disabled: valueFilters.length ? true : false,
      };
    }

    // set to react-hook-form store
    const newDefaultValues = { ...defaultValues };
    for (const value of Object.values(tempCurrentSelectLookups)) {
      newDefaultValues[value.field] = value.selectedValue;
    }
    reset(newDefaultValues);

    // set to redux store
    dispatch(setCurrentSelectLookups(tempCurrentSelectLookups));
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
                  onFocusInput(currentSelectLookups, item.name);
                }}
                value={value}
                status={errors[item.name] ? "error" : ""}
                options={options}
                loading={loadingOptions}
                disabled={
                  currentSelectLookups
                    ? currentSelectLookups[item.name].disabled
                    : true
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
