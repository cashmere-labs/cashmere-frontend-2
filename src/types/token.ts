export class Token {
  asset: string;
  type: string;
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  imageUrl: string;

  constructor({ asset, type, address, name, symbol, decimals, logoURI }: TrustToken) {
    this.asset = asset;
    this.type = type;
    this.address = address;
    this.name = name;
    this.symbol = symbol;
    this.decimals = decimals;
    this.imageUrl = logoURI;
  }
}

export interface TrustToken {
  asset: string;
  type: string;
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
}
