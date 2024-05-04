import { EScreenFieldType } from "../types/enums/EScreenFieldType";

export const getAdditionalRules = (type: EScreenFieldType) => {
    switch (type) {
      case EScreenFieldType.Char:
        return {
          pattern: /[A-Za-z]/,
          maxLength: 1,
        };
      case EScreenFieldType.Number:
        return {
          pattern: /^[0-9]+$/,
        };
      case EScreenFieldType.Float:
        return {
          pattern: /^\d+(\.\d+)?$/,
        };
      default:
        return {};
    }
  };