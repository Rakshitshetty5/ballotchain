import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser : null,
    isVerified: false,
    voterDetails: null,
    walletAddress: null,
  },
  reducers: {
    signIn: (state, action) => {
        state.currentUser = action.payload.user
    },
    signOut: (state) => {
        state.currentUser = null;
    },
    setVoterDetails: (state, action) => {
        state.voterDetails = action.payload.voter_details   
        state.isVerified = action.payload.isVerified     
    },
    setWalletAddress: (state, action) => {
      state.walletAddress = action.payload
    }
  }
});

export const { signIn, signOut, setVoterDetails, setWalletAddress } = authSlice.actions;

export default authSlice.reducer;