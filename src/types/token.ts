import { networkOptions } from "../constants/networkOptions";

export interface ITokenInterface {
  name: string;
  decimal: number;
  addresses: {
    [k: typeof networkOptions[number]["chainId"]]: string;
  };
  imageUrl?: string;
}

type TokenParams = {
  name: string;
  decimal: number;
  addresses: {
    [k: typeof networkOptions[number]["chainId"]]: string;
  };
  imageUrl?: string;
};

export class Token implements ITokenInterface {
  name: string;
  decimal: number;
  addresses: {
    [k: typeof networkOptions[number]["chainId"]]: string;
  };
  imageUrl?: string;

  constructor({ name, decimal, addresses, imageUrl }: TokenParams) {
    this.addresses = addresses;
    this.name = name;
    this.decimal = decimal;
    this.imageUrl = imageUrl;
  }
}
