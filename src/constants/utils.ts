export const NUMBER_REGEX = /^-?\d*\.?\d*$/;

export const apiAddress = process.env.REACT_APP_LOCATION === "test" ? "" : "http://localhost:3001";
