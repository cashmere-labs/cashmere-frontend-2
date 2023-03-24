import axios from 'axios';
import { apiAddress } from '../constants/utils';

export interface DaoStatsResponse {
    transactions: number;
    users: number;
    volume: string;
    fees: string;
    tvl: string;
}

export class Api {
    client = axios.create({ baseURL: `${apiAddress}/` });

    async daoStats(): Promise<DaoStatsResponse> {
        return (await this.client.get('/daoStats')).data;
    }
}
