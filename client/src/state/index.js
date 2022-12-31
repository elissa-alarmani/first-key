import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  collegeApps: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setCollegeApps: (state, action) => {
      state.collegeApps = action.payload.collegeApps;
    },
    setCollegeApp: (state, action) => {
      const updatedCollegeApps = state.collegeApps.map((collegeApp) => {
        if (collegeApp._id === action.payload.collegeApp._id) return action.payload.collegeApp;
        return collegeApp;
      });
      state.collegeApps = updatedCollegeApps;
    },
  },
});

export const { setMode, setLogin, setLogout, setCollegeApps, setCollegeApp } =
  authSlice.actions;
export default authSlice.reducer;