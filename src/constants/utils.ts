export const NUMBER_REGEX = /^-?\d*\.?\d*$/;

export const IS_PROD = !import.meta.env.DEV;
export const apiAddress = IS_PROD ? 'http://localhost:3003' : '';

