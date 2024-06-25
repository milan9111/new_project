import { UseFormReset } from "react-hook-form";
import { ICurrentSelects } from "../types/interfaces/ISettingParams";
import { setCurrentSelects } from "../store/reducers/SettingParamsSlice";
import { useAppDispatch } from "./redux";

const useChangeCurrentSelect = () => {
  const dispatch = useAppDispatch();

  const onChangeCurrentSelect = (
    e: any,
    field: string,
    currentSelects: ICurrentSelects | null,
    defaultValues: Readonly<any> | undefined,
    reset: UseFormReset<any>
  ) => {
    // add new value
    const tempCurrentSelects = { ...currentSelects };
    tempCurrentSelects[field] = {
      ...tempCurrentSelects[field],
      selectedValue: e,
    };

    // cleaning depends on filters
    for (const value of Object.values(tempCurrentSelects)) {
      if (value.filters.includes(field)) {
        tempCurrentSelects[value.field] = {
          ...tempCurrentSelects[value.field],
          options: [],
          selectedValue: "",
          disabled: true,
        };
      }
    }

    // disabled or not
    const activeFilters: string[] = [];
    for (const value of Object.values(tempCurrentSelects)) {
      if (value.selectedValue) {
        activeFilters.push(value.field);
      }
    }

    for (const value of Object.values(tempCurrentSelects)) {
      const valueFilters = [...value.filters];
      activeFilters.forEach((item) => {
        const index = valueFilters.indexOf(item);
        if (index !== -1) {
          valueFilters.splice(index, 1);
        }
      });
      tempCurrentSelects[value.field] = {
        ...tempCurrentSelects[value.field],
        disabled: valueFilters.length ? true : false,
      };
    }

    // set to react-hook-form store
    const newDefaultValues = { ...defaultValues };
    for (const value of Object.values(tempCurrentSelects)) {
      newDefaultValues[value.field] = value.selectedValue;
    }
    reset(newDefaultValues);

    // set to redux store
    dispatch(setCurrentSelects(tempCurrentSelects));
  };

  return onChangeCurrentSelect;
};

export default useChangeCurrentSelect;