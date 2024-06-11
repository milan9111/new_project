/* eslint-disable @typescript-eslint/no-explicit-any */

import { Dayjs } from "dayjs";

interface ISizeOpt {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface IExecBin {
  optional: boolean;
  default: string;
}

interface IWarn {
  optional: boolean;
  default: string;
}

export interface IField {
  fieldType: number;
  upShift?: boolean | null;
  required?: boolean | null;
  dwShift?: boolean | null;
  length?: number | null;
  comments?: string | null;
  default?: string | null;
  lookup?: any | null;
  lookupFields: any[];
  dataType?: string | null;
  include: string[];
  class: string;
  name: string;
  number: number;
  label?: {
    text: string;
    alignment: string;
  } | null;
  row: number;
  colspan: number;
  column: number;
  text?: string | null;
  rowItemType: number;
  filters: any[];
}

interface IRow {
  row: number;
  fields: IField[];
}

interface IForm {
  rows: IRow[];
}

interface IShortDescription {
  optional: boolean;
  default: string;
}

interface IScheduleProcess {
  optional: boolean;
  default: string;
}

interface IOutput {
  optional: boolean;
  default: string;
}

export interface ISettingParamsItem {
  help: string[];
  sizeOpt: ISizeOpt;
  execBin: IExecBin | null;
  form: IForm;
  shortDescription: IShortDescription;
  scheduleProcess: IScheduleProcess;
  screenId: number | null;
  output: IOutput;
  warn?: IWarn | null;
}

export interface IDefaultValuesSettingParams {
  [key: string]: string | boolean | number | null | undefined | Dayjs;
}

export interface ICurrentSelectLookups {
  [key: string]: {
    index: number;
    field: string;
    filters: string[];
    options: { value: string; label: string }[];
    selectedValue: string;
    disabled: boolean;
  };
}

export interface IPayload {
  fieldName: string;
  value: string;
}
