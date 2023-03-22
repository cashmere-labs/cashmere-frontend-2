import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { NetworkTypes } from '../../constants/networks';

export interface NetworkState {
  network: NetworkTypes | string;
}

const initialState: NetworkState = {
  network: NetworkTypes.AVALANCE,
};

export const networkSlice = createSlice({
  name: "network",
  initialState,
  reducers: {
    setNetwork: (state, action: PayloadAction<NetworkTypes | string>) => {
      state.network = action.payload;
    },
  },
});

export const { setNetwork } = networkSlice.actions;
export default networkSlice.reducer;
