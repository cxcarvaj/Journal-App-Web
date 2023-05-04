import { createSlice } from '@reduxjs/toolkit';
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'unauthenticated', // 'checking' | 'unauthenticated' | 'authenticated'
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
  },
  reducers: {
    login: (state, action) => {},
    logout: (state, payload) => {},
    checkingCredentials: (state) => {
      state.status = 'checking';
    }
  }
});
//* These functions are not the same as the reducers we have defined above.
// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;
