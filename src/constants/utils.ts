export const NUMBER_REGEX = /^-?\d*\.?\d*$/;

export const IS_PROD = !import.meta.env.DEV;
export const apiDomain = !IS_PROD ? 'localhost:3003' : location.host;
export const apiAddress = `//${apiDomain}`;

