import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  collegeApps: [],
};

export const deleteCollegeAppFromState = (id) => {
  return {
    type: "DELETE_COLLEGE_APP",
    payload: id,
  };
};

// reducer function
const deleteCollegeApp = (state, action) => {
  const updatedCollegeApps = state.collegeApps.filter((collegeApp) => collegeApp._id !== action.payload);
  state.collegeApps = updatedCollegeApps;
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
    deleteCollegeApp,
  },
});



export const { setMode, setLogin, setLogout, setCollegeApps, setCollegeApp } =
  authSlice.actions;
export default authSlice.reducer;