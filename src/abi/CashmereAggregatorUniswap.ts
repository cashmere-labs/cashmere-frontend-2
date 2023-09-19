import { ContractTransaction, ContractInterface, BytesLike as Arrayish, BigNumber, BigNumberish } from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  CashmereAggregatorUniswap,
  CashmereAggregatorUniswapMethodNames,
  CashmereAggregatorUniswapEventsContext,
  CashmereAggregatorUniswapEvents
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
export type CashmereAggregatorUniswapEvents = 'NewPendingSwap' | 'RoleAdminChanged' | 'RoleGranted' | 'RoleRevoked';
export interface CashmereAggregatorUniswapEventsContext {
  NewPendingSwap(...parameters: any): EventFilter;
  RoleAdminChanged(...parameters: any): EventFilter;
  RoleGranted(...parameters: any): EventFilter;
  RoleRevoked(...parameters: any): EventFilter;
}
export type CashmereAggregatorUniswapMethodNames =
  | 'new'
  | 'CONTINUE_EXECUTOR_ROLE'
  | 'DEFAULT_ADMIN_ROLE'
  | 'assetRouter'
  | 'bridge'
  | 'continueSwap'
  | 'getRoleAdmin'
  | 'grantRole'
  | 'hasRole'
  | 'initialize'
  | 'pendingSwaps'
  | 'renounceRole'
  | 'revokeRole'
  | 'startSwap'
  | 'supportsInterface'
  | 'uniswap'
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
export interface ContinueSwapRequest {
  srcChainId: BigNumberish;
  id: Arrayish;
}
export interface PendingSwapsResponse {
  id: string;
  0: string;
  lwsToken: string;
  1: string;
  hgsAmount: BigNumber;
  2: BigNumber;
  lwsPoolId: number;
  3: number;
  hgsPoolId: number;
  4: number;
  dstToken: string;
  5: string;
  dstChainId: number;
  6: number;
  receiver: string;
  7: string;
  processed: boolean;
  8: boolean;
  minHgsAmount: BigNumber;
  9: BigNumber;
  signature: string;
  10: string;
  length: 11;
}
export interface StartSwapRequest {
  srcToken: string;
  srcAmount: BigNumberish;
  lwsPoolId: BigNumberish;
  hgsPoolId: BigNumberish;
  dstToken: string;
  dstChain: BigNumberish;
  dstAggregatorAddress: string;
  minHgsAmount: BigNumberish;
  signature: Arrayish;
}
export interface CashmereAggregatorUniswap {
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
  CONTINUE_EXECUTOR_ROLE(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  DEFAULT_ADMIN_ROLE(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  assetRouter(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  bridge(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param params Type: tuple, Indexed: false
   */
  continueSwap(params: ContinueSwapRequest, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
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
   * @param assetRouter_ Type: address, Indexed: false
   * @param bridge_ Type: address, Indexed: false
   * @param uniswap_ Type: address, Indexed: false
   * @param admin Type: address, Indexed: false
   */
  initialize(
    assetRouter_: string,
    bridge_: string,
    uniswap_: string,
    admin: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: bytes32, Indexed: false
   */
  pendingSwaps(parameter0: Arrayish, overrides?: ContractCallOverrides): Promise<PendingSwapsResponse>;
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
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  uniswap(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param assetRouter_ Type: address, Indexed: false
   */
  updateAssetRouter(assetRouter_: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param bridge_ Type: address, Indexed: false
   */
  updateBridge(bridge_: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
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
