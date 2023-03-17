import { IS_PROD } from "ethylene/constants";

export const formatValue = (value: string | undefined, decimals = 6) => {
  if (!value) {
    return '0';
  }

  if (value === '...') {
    return value;
  }

  try {
    const [int, decimal] = value?.split(".");
    if (decimal) {
      const returned = [int, decimal.substring(0, decimals)].join(".");
      return returned;
    } else {
      return int;
    }
  } catch (err) {
    if (!IS_PROD) {
      console.log(err);
    }
    return "";
  }
};
