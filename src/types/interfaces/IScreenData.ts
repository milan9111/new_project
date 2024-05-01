/* eslint-disable @typescript-eslint/no-explicit-any */

interface IInclude {
  string: string[];
}

interface IAttribute {
  Name: string | null;
  TableField: string;
  Comment: string;
  AutoNext: boolean;
  Upshift: boolean;
  NoEntry: boolean;
  Required: boolean;
  QueryClear: boolean;
  Right: boolean;
  ZeroFill: boolean;
  DownShift: boolean;
  DefaultValue?: string;
  NoUpdate: boolean;
  Lookup?: string;
  Include?: IInclude;
}

export interface IScreenField {
  Name: string;
  RowPosition: number;
  ColPosition: number;
  Length: number;
  AttributeName?: string;
  Attribute?: IAttribute;
}

interface IFields {
  ScreenField: IScreenField[];
}

export interface IScreen {
  Name: string;
  FileName: string;
  Fields: IFields;
}

export interface ISelectScreens {
  label: string, 
  value: number
}
