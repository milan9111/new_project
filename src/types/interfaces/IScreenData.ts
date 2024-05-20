import { Dayjs } from "dayjs";
import { EScreenFieldType } from "../enums/EScreenFieldType";

interface IInclude {
  label: string;
  value: string;
}

interface IAttribute {
  name: string;
  comment: string;
  upshift: boolean;
  required: boolean;
  right: boolean;
  zeroFill: boolean;
  downShift: boolean;
  defaultValue: string | number | boolean | null | Dayjs;
  format: string | null;
  picture: string | null;
  include: IInclude[];
}

export interface IField {
  name: string;
  rowPosition: number;
  colPosition: number;
  length: number;
  attributeName: string | null;
  attribute: IAttribute | null;
  type: EScreenFieldType;
  key: boolean;
}

export interface IScreen {
  name: string;
  fileName: string;
  fields: IField[];
}

export interface ISelectScreens {
  label: string;
  value: number;
}

export interface IDefaultValuesScreen {
  [key: string]: string | boolean | number | null | undefined | Dayjs;
}
