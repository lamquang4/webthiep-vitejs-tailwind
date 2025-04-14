import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  _id: null,
  name: null,
  email: null,
  token: null,
  type: null,
  status: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.type = action.payload.type;
      state.status = action.payload.status;

      localStorage.setItem("userId", action.payload._id);
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    logout(state, action) {
      state._id = null;
      state.name = null;
      state.email = null;
      state.token = null;
      state.type = null;
      state.status = null;
    },
  },
});

export const { setUser, setToken, logout } = userSlice.actions;
export default userSlice.reducer;
