import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser : null,
    isVerified: false,
    voterDetails: null,
    walletAddress: null,
    phase: 0
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
    },
    setPhase: (state, action) => {
      state.phase = action.payload
    }
  }
});

export const { signIn, signOut, setVoterDetails, setWalletAddress, setPhase } = authSlice.actions;

export default authSlice.reducer;