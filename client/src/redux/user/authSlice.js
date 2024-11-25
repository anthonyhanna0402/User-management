import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name:'auth',
  initialState:{
    token:null,
    role:null,
    userName:null
  },
  reducers:{
    loginSuccess:(state, action)=> {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.userName = action.payload.userName;
    },
    logout:(state)=> {
      state.token= null;
      state.role=null;
      state.userName=null;      
    }
  }
});

export const {loginSuccess, logout} = authSlice.actions;

export default authSlice.reducer;
