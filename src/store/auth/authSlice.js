import { createSlice } from '@reduxjs/toolkit';
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'checking', // 'checking' | 'authenticated' | 'unauthenticated'
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
  },
  reducers: {
    login: (state, action) => {},
    logout: (state, payload) => {},
    checkingCredentials: (state) => {}
  }
});
//* These functions are not the same as the reducers we have defined above.
// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;
