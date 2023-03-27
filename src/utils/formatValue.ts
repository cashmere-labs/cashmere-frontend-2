import { IS_PROD } from '../constants/utils';
import numeral from 'numeral';

export const formatValue = (value: string | undefined, decimals = 6, comma = false) => {
  if (!value) {
    return '0';
  }

  if (value === '...') {
    return value;
  }

  const format = (comma ? '0,0' : '0') + (decimals > 0 ? '.' + '0'.repeat(decimals) : '');
  return numeral(value).format(format);

  // try {
  //   let [int, decimal] = value.split(".");
  //   if (int.length > 3) {
  //     for (let i=0; i < Math.floor(int.length / 3); i++) {
  //
  //     }
  //   }
  //   if (decimal) {
  //     const returned = [int, decimal.substring(0, decimals)].join(".");
  //     return returned;
  //   } else {
  //     return int;
  //   }
  // } catch (err) {
  //   if (!IS_PROD) {
  //     console.log(err);
  //   }
  //   return "";
  // }
};
