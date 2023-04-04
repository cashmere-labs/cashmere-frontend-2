import axios from 'axios';
import { apiAddress } from '../constants/utils';

export interface DaoStatsResponse {
    transactions: number;
    users: number;
    volume: string;
    fees: string;
    tvl: string;
}

export type SwapProgressEntry = {
    id: string;
    step: number;
    receiver: string;
    amount: string;
    srcToken: string;
    lwsToken: string;
    hgsToken: string;
    dstToken: string;
    srcChain: number;
    dstChain: number;
    srcDecimals: number;
    dstDecimals: number;
    srcTokenAddress: string;
    dstTokenAddress: string;
    startTxId: string;
}

export class Api {
    client = axios.create({ baseURL: `${apiAddress}/` });

    async daoStats(): Promise<DaoStatsResponse> {
        return (await this.client.get('/daoStats')).data;
    }

    async pendingTxs(account: string): Promise<SwapProgressEntry[]> {
        return (await this.client.get('/txsList', { params: {
            type: 'pending',
            account,
        } })).data;
    }

    async getTxsProcessed(txIds: string[]): Promise<string[]> {
        return (await this.client.get('/getTxsProcessed', { params: {
            txIds: txIds.join(','),
        } })).data;
    }
}
