/* eslint-disable @typescript-eslint/no-explicit-any */

interface IAttribute {
    Name: string;
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
    DefaultValue?: any;
    NoUpdate: boolean;
    Lookup?: string;
  }
  
  interface IScreenField {
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
  
  interface IScreen {
    Name: string;
    FileName: string;
    Fields: IFields;
  }
  
  export interface IScreenData {
    Screen: IScreen;
  }