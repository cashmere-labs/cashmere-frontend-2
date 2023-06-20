import { BigNumber } from 'ethers';

export default function toBN(value: any) {
    try {
        return BigNumber.from(value);
    } catch (err) {
        return BigNumber.from(0);
    }
}
