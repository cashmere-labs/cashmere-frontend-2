import { BigNumberish, ethers } from "ethers";
import Big from 'big.js';

export const formatBalance = (
  balance: BigNumberish | Big | undefined,
  decimals = 4,
  tokenDecimal = 18,
) => {
  if (!balance) {
    return "0";
  }

  balance = balance.toString();

  try {
    const _balance = ethers.utils
      .formatUnits(balance as BigNumberish, tokenDecimal)
      .toString();

    const [int, decimal] = _balance.split(".");
    const returned = [int, decimal.slice(0, decimals)].join(".");
    return returned;
  } catch (err) {
    console.log(err);
    return '';
  }
};
