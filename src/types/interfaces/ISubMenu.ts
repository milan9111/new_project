interface ISizeOpt {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface IField {
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
  rowItemType: number;
  name: string;
  rowClass: string;
  noEntry: boolean;
  optional: boolean;
  value: string | null;
  screenName: string | null;
}

interface IRow {
  row: number;
  fields: IField[];
}

interface IForm {
  rows: IRow[];
}

export interface ISubMenuItem {
  sizeOpt: ISizeOpt;
  windowTitle: string;
  tabstops: string[];
  form: IForm;
}
