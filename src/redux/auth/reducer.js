import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser : null,
    voterDetails: null
  },
  reducers: {
    signIn: (state, action) => {
        state.currentUser = action.payload
    },
    signOut: (state) => {
        state.currentUser = null;
    },
    setVoterDetails: (state, action) => {
        state.voterDetails = action.payload.voterDetails        
    }
  }
});

export const { signIn, signOut, setVoterDetails } = authSlice.actions;

export default authSlice.reducer;