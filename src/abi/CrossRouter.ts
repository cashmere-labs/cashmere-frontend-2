import { ContractTransaction, ContractInterface, BytesLike as Arrayish, BigNumber, BigNumberish } from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  CrossRouter,
  CrossRouterMethodNames,
  CrossRouterEventsContext,
  CrossRouterEvents
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
export type CrossRouterEvents =
  | 'AssetDeposited'
  | 'AssetRedeemed'
  | 'BridgeUpdated'
  | 'ChainActivated'
  | 'ChainPathUpdate'
  | 'CrossChainLiquidityInitiated'
  | 'CrossChainLiquidityPerformed'
  | 'CrossChainSwapInitiated'
  | 'CrossChainSwapPerformed'
  | 'FeeCollected'
  | 'FeeHandlerUpdated'
  | 'PoolSynced'
  | 'RoleAdminChanged'
  | 'RoleGranted'
  | 'RoleRevoked'
  | 'SendVouchers'
  | 'SwapRemote'
  | 'SyncDeviationUpdated'
  | 'VouchersReceived';
export interface CrossRouterEventsContext {
  AssetDeposited(...parameters: any): EventFilter;
  AssetRedeemed(...parameters: any): EventFilter;
  BridgeUpdated(...parameters: any): EventFilter;
  ChainActivated(...parameters: any): EventFilter;
  ChainPathUpdate(...parameters: any): EventFilter;
  CrossChainLiquidityInitiated(...parameters: any): EventFilter;
  CrossChainLiquidityPerformed(...parameters: any): EventFilter;
  CrossChainSwapInitiated(...parameters: any): EventFilter;
  CrossChainSwapPerformed(...parameters: any): EventFilter;
  FeeCollected(...parameters: any): EventFilter;
  FeeHandlerUpdated(...parameters: any): EventFilter;
  PoolSynced(...parameters: any): EventFilter;
  RoleAdminChanged(...parameters: any): EventFilter;
  RoleGranted(...parameters: any): EventFilter;
  RoleRevoked(...parameters: any): EventFilter;
  SendVouchers(...parameters: any): EventFilter;
  SwapRemote(...parameters: any): EventFilter;
  SyncDeviationUpdated(...parameters: any): EventFilter;
  VouchersReceived(...parameters: any): EventFilter;
}
export type CrossRouterMethodNames =
  | 'new'
  | 'DEFAULT_ADMIN_ROLE'
  | 'activateChainPath'
  | 'chainPathIndexLookup'
  | 'createChainPath'
  | 'deposit'
  | 'getBridge'
  | 'getBridgeVersion'
  | 'getChainId'
  | 'getChainPathPublic'
  | 'getChainPathsLength'
  | 'getEffectivePath'
  | 'getFeeCollector'
  | 'getFeeHandler'
  | 'getNonce'
  | 'getPaths'
  | 'getPool'
  | 'getRoleAdmin'
  | 'getSyncDeviation'
  | 'grantRole'
  | 'hasRole'
  | 'poolIdsPerChain'
  | 'quoteSwap'
  | 'receiveVouchers'
  | 'redeemLocal'
  | 'renounceRole'
  | 'revokeRole'
  | 'sendVouchers'
  | 'setBridge'
  | 'setFeeLibrary'
  | 'setSyncDeviation'
  | 'setWeightForChainPath'
  | 'supportsInterface'
  | 'swap'
  | 'swapRemote'
  | 'sync';
export interface AssetDepositedEventEmittedResponse {
  to: string;
  poolId: BigNumberish;
  amount: BigNumberish;
}
export interface AssetRedeemedEventEmittedResponse {
  from: string;
  poolId: BigNumberish;
  amount: BigNumberish;
}
export interface BridgeUpdatedEventEmittedResponse {
  oldBridge: string;
  newBridge: string;
}
export interface ChainActivatedEventEmittedResponse {
  srcPoolId: BigNumberish;
  dstChainId: BigNumberish;
  dstPoolId: BigNumberish;
}
export interface ChainPathUpdateEventEmittedResponse {
  srcPoolId: BigNumberish;
  dstChainId: BigNumberish;
  dstPoolId: BigNumberish;
  weight: BigNumberish;
}
export interface CrossChainLiquidityInitiatedEventEmittedResponse {
  sender: string;
  id: Arrayish;
  srcPoolId: BigNumberish;
  dstChainId: BigNumberish;
  dstPoolId: BigNumberish;
  vouchers: BigNumberish;
  optimalDstBandwidth: BigNumberish;
}
export interface CrossChainLiquidityPerformedEventEmittedResponse {
  message: MessageRequest;
}
export interface CrossChainSwapInitiatedEventEmittedResponse {
  sender: string;
  id: Arrayish;
  srcPoolId: BigNumberish;
  dstChainId: BigNumberish;
  dstPoolId: BigNumberish;
  expectedAmount: BigNumberish;
  actualAmount: BigNumberish;
  fee: BigNumberish;
  vouchers: BigNumberish;
  optimalDstBandwidth: BigNumberish;
  payload: Arrayish;
}
export interface CrossChainSwapPerformedEventEmittedResponse {
  srcPoolId: BigNumberish;
  dstPoolId: BigNumberish;
  srcChainId: BigNumberish;
  to: string;
  amount: BigNumberish;
  fee: BigNumberish;
}
export interface FeeCollectedEventEmittedResponse {
  fee: BigNumberish;
}
export interface FeeHandlerUpdatedEventEmittedResponse {
  oldFeeHandler: string;
  newFeeHandler: string;
}
export interface PoolSyncedEventEmittedResponse {
  poolId: BigNumberish;
  distributedVouchers: BigNumberish;
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
export interface SendVouchersEventEmittedResponse {
  dstChainId: BigNumberish;
  dstPoolId: BigNumberish;
  vouchers: BigNumberish;
  optimalDstBandwidth: BigNumberish;
}
export interface SwapRemoteEventEmittedResponse {
  to: string;
  amount: BigNumberish;
  fee: BigNumberish;
}
export interface SyncDeviationUpdatedEventEmittedResponse {
  oldDeviation: BigNumberish;
  newDeviation: BigNumberish;
}
export interface VouchersReceivedEventEmittedResponse {
  chainId: BigNumberish;
  srcPoolId: BigNumberish;
  amount: BigNumberish;
  optimalDstBandwidth: BigNumberish;
}
export interface PathResponse {
  active: boolean;
  0: boolean;
  srcPoolId: number;
  1: number;
  dstChainId: number;
  2: number;
  dstPoolId: number;
  3: number;
  weight: number;
  4: number;
  poolAddress: string;
  5: string;
  bandwidth: BigNumber;
  6: BigNumber;
  actualBandwidth: BigNumber;
  7: BigNumber;
  kbp: BigNumber;
  8: BigNumber;
  actualKbp: BigNumber;
  9: BigNumber;
  vouchers: BigNumber;
  10: BigNumber;
  optimalDstBandwidth: BigNumber;
  11: BigNumber;
}
export interface ChainpathResponse {
  active: boolean;
  0: boolean;
  srcPoolId: number;
  1: number;
  dstChainId: number;
  2: number;
  dstPoolId: number;
  3: number;
  weight: number;
  4: number;
  poolAddress: string;
  5: string;
  bandwidth: BigNumber;
  6: BigNumber;
  actualBandwidth: BigNumber;
  7: BigNumber;
  kbp: BigNumber;
  8: BigNumber;
  actualKbp: BigNumber;
  9: BigNumber;
  vouchers: BigNumber;
  10: BigNumber;
  optimalDstBandwidth: BigNumber;
  11: BigNumber;
}
export interface PoolobjectResponse {
  poolId: number;
  0: number;
  poolAddress: string;
  1: string;
  totalWeight: BigNumber;
  2: BigNumber;
  totalLiquidity: BigNumber;
  3: BigNumber;
  undistributedVouchers: BigNumber;
  4: BigNumber;
}
export interface QuoteSwapRequest {
  srcPoolId: BigNumberish;
  dstPoolId: BigNumberish;
  dstChainId: BigNumberish;
  to: string;
  amount: BigNumberish;
  minAmount: BigNumberish;
  refundAddress: string;
  payload: Arrayish;
}
export interface QuoteSwapResponse {
  amount: BigNumber;
  0: BigNumber;
  fee: BigNumber;
  1: BigNumber;
  length: 2;
}
export interface SwapRequest {
  srcPoolId: BigNumberish;
  dstPoolId: BigNumberish;
  dstChainId: BigNumberish;
  to: string;
  amount: BigNumberish;
  minAmount: BigNumberish;
  refundAddress: string;
  payload: Arrayish;
}
export interface CrossRouter {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   * @param feeHandler Type: address, Indexed: false
   * @param chainId Type: uint16, Indexed: false
   * @param feeCollector Type: address, Indexed: false
   */
  'new'(
    feeHandler: string,
    chainId: BigNumberish,
    feeCollector: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>;
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
   * @param srcPoolId Type: uint16, Indexed: false
   * @param dstChainId Type: uint16, Indexed: false
   * @param dstPoolId Type: uint16, Indexed: false
   */
  activateChainPath(
    srcPoolId: BigNumberish,
    dstChainId: BigNumberish,
    dstPoolId: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param key Type: bytes32, Indexed: false
   */
  chainPathIndexLookup(key: Arrayish, overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param srcPoolId Type: uint16, Indexed: false
   * @param dstChainId Type: uint16, Indexed: false
   * @param dstPoolId Type: uint16, Indexed: false
   * @param weight Type: uint16, Indexed: false
   * @param poolAddress Type: address, Indexed: false
   */
  createChainPath(
    srcPoolId: BigNumberish,
    dstChainId: BigNumberish,
    dstPoolId: BigNumberish,
    weight: BigNumberish,
    poolAddress: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param to Type: address, Indexed: false
   * @param poolId Type: uint16, Indexed: false
   * @param amount Type: uint256, Indexed: false
   */
  deposit(
    to: string,
    poolId: BigNumberish,
    amount: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>;
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
  getBridgeVersion(overrides?: ContractCallOverrides): Promise<number>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getChainId(overrides?: ContractCallOverrides): Promise<number>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param srcPoolId Type: uint16, Indexed: false
   * @param dstChainId Type: uint16, Indexed: false
   * @param dstPoolId Type: uint16, Indexed: false
   */
  getChainPathPublic(
    srcPoolId: BigNumberish,
    dstChainId: BigNumberish,
    dstPoolId: BigNumberish,
    overrides?: ContractCallOverrides,
  ): Promise<PathResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param poolId Type: uint16, Indexed: false
   */
  getChainPathsLength(poolId: BigNumberish, overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param dstChainId Type: uint16, Indexed: false
   * @param amountToSimulate Type: uint256, Indexed: false
   */
  getEffectivePath(
    dstChainId: BigNumberish,
    amountToSimulate: BigNumberish,
    overrides?: ContractCallOverrides,
  ): Promise<[number, number, number]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getFeeCollector(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getFeeHandler(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param chainId Type: uint16, Indexed: false
   */
  getNonce(chainId: BigNumberish, overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param poolId Type: uint16, Indexed: false
   */
  getPaths(poolId: BigNumberish, overrides?: ContractCallOverrides): Promise<ChainpathResponse[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param poolId Type: uint16, Indexed: false
   */
  getPool(poolId: BigNumberish, overrides?: ContractCallOverrides): Promise<PoolobjectResponse>;
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
   */
  getSyncDeviation(overrides?: ContractCallOverrides): Promise<BigNumber>;
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
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param chainId Type: uint16, Indexed: false
   */
  poolIdsPerChain(chainId: BigNumberish, overrides?: ContractCallOverrides): Promise<number[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param swapParams Type: tuple, Indexed: false
   */
  quoteSwap(swapParams: QuoteSwapRequest, overrides?: ContractCallOverrides): Promise<QuoteSwapResponse>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param srcChainId Type: uint16, Indexed: false
   * @param srcPoolId Type: uint16, Indexed: false
   * @param dstPoolId Type: uint16, Indexed: false
   * @param vouchers Type: uint256, Indexed: false
   * @param optimalDstBandwidth Type: uint256, Indexed: false
   * @param isSwap Type: bool, Indexed: false
   * @param srcActualKbp Type: uint256, Indexed: false
   */
  receiveVouchers(
    srcChainId: BigNumberish,
    srcPoolId: BigNumberish,
    dstPoolId: BigNumberish,
    vouchers: BigNumberish,
    optimalDstBandwidth: BigNumberish,
    isSwap: boolean,
    srcActualKbp: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param to Type: address, Indexed: false
   * @param poolId Type: uint16, Indexed: false
   * @param amount Type: uint256, Indexed: false
   */
  redeemLocal(
    to: string,
    poolId: BigNumberish,
    amount: BigNumberish,
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
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param srcPoolId Type: uint16, Indexed: false
   * @param dstChainId Type: uint16, Indexed: false
   * @param dstPoolId Type: uint16, Indexed: false
   * @param refundAddress Type: address, Indexed: false
   */
  sendVouchers(
    srcPoolId: BigNumberish,
    dstChainId: BigNumberish,
    dstPoolId: BigNumberish,
    refundAddress: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param bridge Type: address, Indexed: false
   */
  setBridge(bridge: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param feeHandlerParam Type: address, Indexed: false
   */
  setFeeLibrary(feeHandlerParam: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param syncDeviation Type: uint256, Indexed: false
   */
  setSyncDeviation(syncDeviation: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param srcPoolId Type: uint16, Indexed: false
   * @param dstChainId Type: uint16, Indexed: false
   * @param dstPoolId Type: uint16, Indexed: false
   * @param weight Type: uint16, Indexed: false
   */
  setWeightForChainPath(
    srcPoolId: BigNumberish,
    dstChainId: BigNumberish,
    dstPoolId: BigNumberish,
    weight: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param interfaceId Type: bytes4, Indexed: false
   */
  supportsInterface(interfaceId: Arrayish, overrides?: ContractCallOverrides): Promise<boolean>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param swapParams Type: tuple, Indexed: false
   */
  swap(swapParams: SwapRequest, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param srcPoolId Type: uint16, Indexed: false
   * @param dstPoolId Type: uint16, Indexed: false
   * @param srcChainId Type: uint16, Indexed: false
   * @param to Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   * @param fee Type: uint256, Indexed: false
   * @param vouchers Type: uint256, Indexed: false
   * @param optimalDstBandwidth Type: uint256, Indexed: false
   * @param srcActualKbp Type: uint256, Indexed: false
   */
  swapRemote(
    srcPoolId: BigNumberish,
    dstPoolId: BigNumberish,
    srcChainId: BigNumberish,
    to: string,
    amount: BigNumberish,
    fee: BigNumberish,
    vouchers: BigNumberish,
    optimalDstBandwidth: BigNumberish,
    srcActualKbp: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param poolId Type: uint16, Indexed: false
   */
  sync(poolId: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
}
