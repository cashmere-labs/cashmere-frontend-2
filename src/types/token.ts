export class Token {
  asset: string;
  type: string;
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  iconUrl: string;

  constructor({ asset, type, address, name, symbol, decimals, iconUrl }: TrustToken) {
    this.asset = asset;
    this.type = type;
    this.address = address;
    this.name = name;
    this.symbol = symbol;
    this.decimals = decimals;
    this.iconUrl = iconUrl;
  }
}

export interface TrustToken {
  asset: string;
  type: string;
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  iconUrl: string;
}
