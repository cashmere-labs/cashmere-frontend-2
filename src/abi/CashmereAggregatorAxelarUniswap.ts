import { ContractTransaction, ContractInterface, BytesLike as Arrayish, BigNumber, BigNumberish } from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  CashmereAggregatorAxelarUniswap,
  CashmereAggregatorAxelarUniswapMethodNames,
  CashmereAggregatorAxelarUniswapEventsContext,
  CashmereAggregatorAxelarUniswapEvents
>;

export declare type EventFilter = {
  address?: string;
  topics?: Array<string>;
  fromBlock?: string | number;
  toBlock?: string | number;
};

export interface ContractTransactionOverrides {
  /**
   * The maximum units of gas for the transaction to use
   */
  gasLimit?: number;
  /**
   * The price (in wei) per unit of gas
   */
  gasPrice?: BigNumber | string | number | Promise<any>;
  /**
   * The nonce to use in the transaction
   */
  nonce?: number;
  /**
   * The amount to send with the transaction (i.e. msg.value)
   */
  value?: BigNumber | string | number | Promise<any>;
  /**
   * The chain ID (or network ID) to use
   */
  chainId?: number;
}

export interface ContractCallOverrides {
  /**
   * The address to execute the call as
   */
  from?: string;
  /**
   * The maximum units of gas for the transaction to use
   */
  gasLimit?: number;
}
export type CashmereAggregatorAxelarUniswapEvents =
  | 'AggregatorInfosUpdated'
  | 'NewPendingSwap'
  | 'RoleAdminChanged'
  | 'RoleGranted'
  | 'RoleRevoked'
  | 'SwapContinued';
export interface CashmereAggregatorAxelarUniswapEventsContext {
  AggregatorInfosUpdated(...parameters: any): EventFilter;
  NewPendingSwap(...parameters: any): EventFilter;
  RoleAdminChanged(...parameters: any): EventFilter;
  RoleGranted(...parameters: any): EventFilter;
  RoleRevoked(...parameters: any): EventFilter;
  SwapContinued(...parameters: any): EventFilter;
}
export type CashmereAggregatorAxelarUniswapMethodNames =
  | 'new'
  | 'DEFAULT_ADMIN_ROLE'
  | 'finishSwap'
  | 'getAggregatorInfos'
  | 'getAssetRouter'
  | 'getBridge'
  | 'getInitialized'
  | 'getRoleAdmin'
  | 'getSentSwaps'
  | 'getSwapReceived'
  | 'getUniswap'
  | 'getWrappedNativeToken'
  | 'grantRole'
  | 'hasRole'
  | 'initialize'
  | 'renounceRole'
  | 'revokeRole'
  | 'setAggregatorInfos'
  | 'startSwap'
  | 'supportsInterface'
  | 'updateAssetRouter'
  | 'updateBridge'
  | 'withdrawTokens';
export interface NewPendingSwapEventEmittedResponse {
  id: Arrayish;
}
export interface RoleAdminChangedEventEmittedResponse {
  role: Arrayish;
  previousAdminRole: Arrayish;
  newAdminRole: Arrayish;
}
export interface RoleGrantedEventEmittedResponse {
  role: Arrayish;
  account: string;
  sender: string;
}
export interface RoleRevokedEventEmittedResponse {
  role: Arrayish;
  account: string;
  sender: string;
}
export interface SwapContinuedEventEmittedResponse {
  id: Arrayish;
  to: string;
}
export interface AggregatorinfoResponse {
  srcAggregatorAddress: string;
  0: string;
  l0ChainId: number;
  1: number;
  chainId: BigNumber;
  2: BigNumber;
}
export interface SentswapResponse {
  id: string;
  0: string;
  lwsToken: string;
  1: string;
  lwsPoolId: number;
  2: number;
  hgsPoolId: number;
  3: number;
  dstToken: string;
  4: string;
  dstChainId: number;
  5: number;
  receiver: string;
  6: string;
  minHgsAmount: BigNumber;
  7: BigNumber;
}
export interface SetAggregatorInfosRequest {
  srcAggregatorAddress: string;
  l0ChainId: BigNumberish;
  chainId: BigNumberish;
}
export interface StartSwapRequest {
  srcToken: string;
  srcAmount: BigNumberish;
  router1Inch: string;
  data: Arrayish;
  lwsPoolId: BigNumberish;
  hgsPoolId: BigNumberish;
  dstToken: string;
  dstChain: BigNumberish;
  minHgsAmount: BigNumberish;
}
export interface CashmereAggregatorAxelarUniswap {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   */
  'new'(overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  DEFAULT_ADMIN_ROLE(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param srcChainId Type: uint16, Indexed: false
   * @param hgsPoolId Type: uint16, Indexed: false
   * @param amount Type: uint256, Indexed: false
   * @param swapId Type: bytes32, Indexed: false
   * @param receiver Type: address, Indexed: false
   * @param dstToken Type: address, Indexed: false
   */
  finishSwap(
    srcChainId: BigNumberish,
    hgsPoolId: BigNumberish,
    amount: BigNumberish,
    swapId: Arrayish,
    receiver: string,
    dstToken: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param chainId Type: uint16, Indexed: false
   */
  getAggregatorInfos(chainId: BigNumberish, overrides?: ContractCallOverrides): Promise<AggregatorinfoResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getAssetRouter(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getBridge(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getInitialized(overrides?: ContractCallOverrides): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param role Type: bytes32, Indexed: false
   */
  getRoleAdmin(role: Arrayish, overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param swapId Type: bytes32, Indexed: false
   */
  getSentSwaps(swapId: Arrayish, overrides?: ContractCallOverrides): Promise<SentswapResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param chainId Type: uint16, Indexed: false
   * @param swapId Type: bytes32, Indexed: false
   */
  getSwapReceived(chainId: BigNumberish, swapId: Arrayish, overrides?: ContractCallOverrides): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getUniswap(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getWrappedNativeToken(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param role Type: bytes32, Indexed: false
   * @param account Type: address, Indexed: false
   */
  grantRole(role: Arrayish, account: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param role Type: bytes32, Indexed: false
   * @param account Type: address, Indexed: false
   */
  hasRole(role: Arrayish, account: string, overrides?: ContractCallOverrides): Promise<boolean>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param assetRouter Type: address, Indexed: false
   * @param bridge Type: address, Indexed: false
   * @param uniswap Type: address, Indexed: false
   * @param wrappedNativeToken Type: address, Indexed: false
   * @param admin Type: address, Indexed: false
   */
  initialize(
    assetRouter: string,
    bridge: string,
    uniswap: string,
    wrappedNativeToken: string,
    admin: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param role Type: bytes32, Indexed: false
   * @param account Type: address, Indexed: false
   */
  renounceRole(role: Arrayish, account: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param role Type: bytes32, Indexed: false
   * @param account Type: address, Indexed: false
   */
  revokeRole(role: Arrayish, account: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param infos Type: tuple[], Indexed: false
   */
  setAggregatorInfos(
    infos: SetAggregatorInfosRequest[],
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param params Type: tuple, Indexed: false
   */
  startSwap(params: StartSwapRequest, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param interfaceId Type: bytes4, Indexed: false
   */
  supportsInterface(interfaceId: Arrayish, overrides?: ContractCallOverrides): Promise<boolean>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param assetRouter Type: address, Indexed: false
   */
  updateAssetRouter(assetRouter: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param bridge Type: address, Indexed: false
   */
  updateBridge(bridge: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param token Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   */
  withdrawTokens(
    token: string,
    amount: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>;
}
