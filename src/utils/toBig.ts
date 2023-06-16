import Big from 'big.js';

export default function toBig(value: any) {
    try {
        return new Big(value);
    } catch (err) {
        return new Big(0);
    }
}
