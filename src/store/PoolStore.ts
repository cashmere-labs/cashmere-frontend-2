import RootStore from './RootStore';
import { action, makeObservable, observable } from 'mobx';
import { PoolData } from '../types/app';
import {
    activeChains,
    arbitrumGoerli,
    avalancheFuji, baseGoerli,
    bscTestnet,
    fantomTestnet,
    goerli, lineaTestnet, metisGoerli, optimismGoerli,
    polygonMumbai, polygonZkEvmTestnet
} from '../constants/chains';

export const pools: PoolData[] = [
    {
        name: 'USDC',
        CR: "54.89",
        logo: "https://assets-cdn.trustwallet.com/blockchains/polygon/assets/0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174/logo.png",
        network: goerli.id,
        rewards: '390.124',
        stakedLP: '123',
        assetAddress: '0xb9cd1EBcf521af3Ef18aE4746927041C69e09D0d',
        tokenAddress: '0x9b2660a7becd0bf3d90401d1c214d2cd36317da5',
        crossRouterAddress: '0xdD219A18568a625E25210DC6abA0728d59661c81'
    },
    {
        name: 'USDC',
        CR: "54.89",
        logo: "https://assets-cdn.trustwallet.com/blockchains/polygon/assets/0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174/logo.png",
        network: polygonMumbai.id,
        rewards: '390.124',
        stakedLP: '123',
        assetAddress: '0x3f42623aBa24E5Ab48D2e352047496197205957e',
        tokenAddress: '0x9F2bdc7c63D9CAD3Af1C5902d7fbCa297E0fc2Df',
        crossRouterAddress: '0xc98b11A0Eb13bdEe82AF377Ea36869ccE3c53126'
    },
    {
        name: 'USDC',
        CR: "54.89",
        logo: "https://assets-cdn.trustwallet.com/blockchains/polygon/assets/0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174/logo.png",
        network: bscTestnet.id,
        rewards: '390.124',
        stakedLP: '123',
        assetAddress: '0xc98b11A0Eb13bdEe82AF377Ea36869ccE3c53126',
        tokenAddress: '0x4325BB533E44c369ed9A154bDe923DF0Bbef129C',
        crossRouterAddress: '0xC13F9968B7BF493C9c38151a6C16a784B9866CC2'
    },
    {
        name: 'USDC',
        CR: "54.89",
        logo: "https://assets-cdn.trustwallet.com/blockchains/polygon/assets/0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174/logo.png",
        network: avalancheFuji.id,
        rewards: '390.124',
        stakedLP: '123',
        assetAddress: '0x7DeA0cDCE2DFF29D0704Ae95852d1BC553e412fF',
        tokenAddress: '0x231401dC8b53338d78c08f83CC4EBc74148196d0',
        crossRouterAddress: '0xb9cd1EBcf521af3Ef18aE4746927041C69e09D0d'
    },
    {
        name: 'USDC',
        CR: "54.89",
        logo: "https://assets-cdn.trustwallet.com/blockchains/polygon/assets/0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174/logo.png",
        network: fantomTestnet.id,
        rewards: '390.124',
        stakedLP: '123',
        assetAddress: '0xb7E0a2a14dD4ea70c21D9D9687F5195A80D0A12c',
        tokenAddress: '0x0Fdf019338d4229A160011d0aA87485c756a24f0',
        crossRouterAddress: '0x99f92e2328ccf7346487b640B17572ca8232b5B6'
    },
    {
        name: 'USDC',
        CR: "54.89",
        logo: "https://assets-cdn.trustwallet.com/blockchains/polygon/assets/0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174/logo.png",
        network: arbitrumGoerli.id,
        rewards: '390.124',
        stakedLP: '123',
        assetAddress: '0xfe885C861C538dbac33D2D599235189143d1B801',
        tokenAddress: '0x747E19a0A0D074598BB5FB758591bFF8dE517312',
        crossRouterAddress: '0xD409518A8E7d18e314B16C6e0092B353a2e5B25A'
    },
    {
        name: 'USDC',
        CR: "54.89",
        logo: "https://assets-cdn.trustwallet.com/blockchains/polygon/assets/0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174/logo.png",
        network: optimismGoerli.id,
        rewards: '390.124',
        stakedLP: '123',
        assetAddress: '0x974B27d3cF84C4cDFCf5279b63D200792987d5A5',
        tokenAddress: '0x12AAef2833E39d556d9D913574a8B021D8e954c0',
        crossRouterAddress: '0x9994Ec4e5034E634Fa54BE3DB3D73509275e1547'
    },
    {
        name: 'USDC',
        CR: "54.89",
        logo: "https://assets-cdn.trustwallet.com/blockchains/polygon/assets/0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174/logo.png",
        network: baseGoerli.id,
        rewards: '390.124',
        stakedLP: '123',
        assetAddress: '0xf2080Af10985A0eF7E1D880bAE1d4a72F2398d70',
        tokenAddress: '0x290B54A504A3b0cB21888e3E405AFC1b2946598C',
        crossRouterAddress: '0xCd239727F42fEc660Bf55127Bd482CEBa25dbF96'
    },
    {
        name: 'USDC',
        CR: "54.89",
        logo: "https://assets-cdn.trustwallet.com/blockchains/polygon/assets/0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174/logo.png",
        network: lineaTestnet.id,
        rewards: '390.124',
        stakedLP: '123',
        assetAddress: '0x708A47A78885710A97c12086AE1317F82d108756',
        tokenAddress: '0xF484ca938Af7165d0A8D99746939b1B60A26F0af',
        crossRouterAddress: '0x7DeA0cDCE2DFF29D0704Ae95852d1BC553e412fF'
    },
    {
        name: 'USDC',
        CR: "54.89",
        logo: "https://assets-cdn.trustwallet.com/blockchains/polygon/assets/0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174/logo.png",
        network: polygonZkEvmTestnet.id,
        rewards: '390.124',
        stakedLP: '123',
        assetAddress: '0xdD219A18568a625E25210DC6abA0728d59661c81',
        tokenAddress: '0x557278364B136a8D7686016b1930c8C7136d8af9',
        crossRouterAddress: '0x35a0727D5FFE4c6d12cfe7E3Ea1BC6ff3ed407F3'
    },
    {
        name: 'USDC',
        CR: "54.89",
        logo: "https://assets-cdn.trustwallet.com/blockchains/polygon/assets/0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174/logo.png",
        network: metisGoerli.id,
        rewards: '390.124',
        stakedLP: '123',
        assetAddress: '0xfe885C861C538dbac33D2D599235189143d1B801',
        tokenAddress: '0xC5aB03962938Fa544D16F4667ED76788894fFca4',
        crossRouterAddress: '0xD409518A8E7d18e314B16C6e0092B353a2e5B25A'
    },
].filter(pool => activeChains.map(chain => chain.id).includes(pool.network));

export default class PoolStore {
    @observable whichPool = false;
    @observable poolCount = 12;
    @observable whichGlobalModal = -1;
    @observable whichPersonalModal = -1;
    @observable functionName = '';
    @observable value = '';

    constructor(private readonly rootStore: RootStore) {
        makeObservable(this);
    }

    @action setWhichPool(value: boolean) {
        this.whichPool = value;
    }

    @action setPoolCount(value: number) {
        this.poolCount = value;
    }

    @action setWhichGlobalModal(value: number) {
        this.whichGlobalModal = value;
    }

    @action setWhichPersonalModal(value: number) {
        this.whichPersonalModal = value;
    }

    @action setFunctionName(value: string) {
        this.functionName = value;
    }

    @action setValue(value: string) {
        this.value = value;
    }
}
