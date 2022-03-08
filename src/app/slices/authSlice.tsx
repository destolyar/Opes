import { createSlice } from "@reduxjs/toolkit";
import { authSliceState } from "../../types";

const initialState: authSliceState = {
  isAuth: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogIn(state, action) {
      state.isAuth = action.payload.isAuth;
    }
  }
})


export const {setLogIn} = authSlice.actions;
export default authSlice.reducer;