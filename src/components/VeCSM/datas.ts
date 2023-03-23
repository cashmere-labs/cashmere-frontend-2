import { Lockers, MyLocks } from "../../types/app";
import { arbitrum, avalanche, bsc, ethereum, fantom, optimism, polygon } from '../../constants/chains';

export const LockersDatas: Lockers[] = [
  {
    id: 1,
    network: ethereum.id,
    totalLockedCSM: "5,234,921.09",
    weeklyFees: "390.124",
  },
  {
    id: 2,
    network: bsc.id,
    totalLockedCSM: "5,234,921.09",
    weeklyFees: "390.124",
  },
  {
    id: 3,
    network: avalanche.id,
    totalLockedCSM: "5,234,921.09",
    weeklyFees: "390.124",
  },
  {
    id: 4,
    network: polygon.id,
    totalLockedCSM: "5,234,921.09",
    weeklyFees: "390.124",
  },
  {
    id: 5,
    network: arbitrum.id,
    totalLockedCSM: "5,234,921.09",
    weeklyFees: "390.124",
  },
  {
    id: 6,
    network: optimism.id,
    totalLockedCSM: "5,234,921.09",
    weeklyFees: "390.124",
  },
  {
    id: 7,
    network: fantom.id,
    totalLockedCSM: "5,234,921.09",
    weeklyFees: "390.124",
  },
];

export const MyLocksDatas: MyLocks[] = [
  {
    id: 8,
    network: ethereum.id,
    weeklyFees: "285.150",
    claimableFees: "285.150",
    myVotePower: "150.000",
    myLockedCSM: "150,000",
  },
  {
    id: 9,
    network: bsc.id,
    weeklyFees: "285.150",
    claimableFees: "285.150",
    myVotePower: "150.000",
    myLockedCSM: "150,000",
  },
  {
    id: 10,
    network: avalanche.id,
    weeklyFees: "285.150",
    claimableFees: "285.150",
    myVotePower: "150.000",
    myLockedCSM: "150,000",
  },
  {
    id: 11,
    network: polygon.id,
    weeklyFees: "285.150",
    claimableFees: "285.150",
    myVotePower: "150.000",
    myLockedCSM: "150,000",
  },
  {
    id: 12,
    network: arbitrum.id,
    weeklyFees: "285.150",
    claimableFees: "285.150",
    myVotePower: "150.000",
    myLockedCSM: "150,000",
  },
  {
    id: 13,
    network: optimism.id,
    weeklyFees: "285.150",
    claimableFees: "285.150",
    myVotePower: "150.000",
    myLockedCSM: "150,000",
  },
  {
    id: 14,
    network: fantom.id,
    weeklyFees: "285.150",
    claimableFees: "285.150",
    myVotePower: "150.000",
    myLockedCSM: "150,000",
  },
];
