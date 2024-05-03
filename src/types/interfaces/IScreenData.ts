import { ScreenFieldType } from "../enums/EScreenFieldType";

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
  defaultValue: string | null;
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
  type: ScreenFieldType;
}

export interface IScreen {
  name: string;
  fileName: string;
  fields: IField[];
}

export interface ISelectScreens {
  label: string, 
  value: number
}
