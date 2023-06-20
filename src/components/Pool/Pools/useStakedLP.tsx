import { PoolData } from '../../../types/app';
import { useContractRead, useToken } from 'wagmi';
import AssetABI from '../../../abi/Asset.json';
import { BigNumber } from 'ethers';
import { Spinner } from '../../../ui';
import { formatBalance } from '../../../utils/formatBalance';

export const StakedLP  = ({ pool }: { pool?: PoolData }) => {
    const { data, isLoading } = useContractRead({
        chainId: pool?.network,
        address: pool?.assetAddress,
        abi: AssetABI,
        functionName: 'totalSupply',
        args: [],
    });

    const { data: token } = useToken({
        chainId: pool?.network,
        address: pool?.tokenAddress,
    });

    if (!isLoading)
        return <>${formatBalance(data as BigNumber, 4, token?.decimals)}</>;
    return <Spinner />;
};
