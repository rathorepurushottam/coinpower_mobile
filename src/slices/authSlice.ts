import {createSlice} from '@reduxjs/toolkit';
export const initialState = {
  isLoading: false,
  userData: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, {payload}) => {
      state.isLoading = payload;
    },
    setUserData: (state, {payload}) => {
      state.userData = payload;
    },
  },
});
export const {setLoading, setUserData} = authSlice.actions;
// export const authSelector = state => state.auth;
export const authReducer = authSlice.reducer;
