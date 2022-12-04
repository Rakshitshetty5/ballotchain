import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser : null,
    isVerified: false,
    voterDetails: null
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
    }
  }
});

export const { signIn, signOut, setVoterDetails } = authSlice.actions;

export default authSlice.reducer;