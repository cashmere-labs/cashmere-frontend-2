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

    const parts = _balance.split(".");
    if (parts[1])
      parts[1] = parts[1].slice(0, decimals);
    const returned = parts.join(".");
    return returned;
  } catch (err) {
    console.log(err);
    return '';
  }
};
