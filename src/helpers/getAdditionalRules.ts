import { EScreenFieldType } from "../types/enums/EScreenFieldType";

export const getAdditionalRules = (type: EScreenFieldType) => {
  switch (type) {
    case EScreenFieldType.Char:
      return {
        pattern: { value: /[A-Za-z]/, message: "Only letters" },
        maxLength: { value: 1, message: "Only one letter" },
      };
    case EScreenFieldType.Number:
      return {
        pattern: { value: /^[0-9]+$/, message: "Only numbers" },
      };
    case EScreenFieldType.Float:
      return {
        pattern: {
          value: /^\d+(\.\d+)?$/,
          message: "Only numbers or float numbers",
        },
      };
    default:
      return {};
  }
};
