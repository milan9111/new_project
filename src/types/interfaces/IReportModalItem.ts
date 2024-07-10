
interface ISizeOpt {
    x: number;
    y: number;
    width: number;
    height: number;
  }
  
  export interface IField {
    row: number;
    colspan: number;
    column: number;
    text: string | null;
    help: string | null;
    upShift: boolean;
    required: boolean;
    dwShift: boolean;
    length: number;
    comments: string | null;
    default: string | null;
    include: string[] | null;
    rowItemType: number;
    name: string;
    rowClass: string;
    noEntry: boolean;
    optional: boolean;
    value: string | null;
  }
  
  interface IRow {
    row: number;
    screenName: string | null;
    fields: IField[];
  }
  
  interface IForm {
    rows: IRow[];
  }
  
  export interface IReportModalItem {
    sizeOpt: ISizeOpt;
    windowTitle: string | null;
    tabstops: string[];
    form: IForm;
  }