import {
  authSlice,
  checkingCredentials,
  login,
  logout
} from '../../../src/store/auth/authSlice';
import {
  authenticatedState,
  demoUser,
  initialState
} from '../../fixtures/authFixtures';

describe('Tests on authSlice', () => {
  it('should return the initial state', () => {
    // console.log(authSlice);

    expect(authSlice.name).toBe('auth');

    const state = authSlice.reducer(initialState, {});

    // console.log(state);

    expect(state).toEqual(initialState);
  });

  it('should authenticate the user', () => {
    //* This is the action we need to send to the reducer.
    // console.log(login(demoUser));
    const state = authSlice.reducer(initialState, login(demoUser));
    // console.log(state);

    expect(state).toEqual({
      status: 'authenticated',
      uid: demoUser.uid,
      email: demoUser.email,
      displayName: demoUser.displayName,
      photoURL: demoUser.photoURL,
      errorMessage: null
    });
  });

  it('should logout the user', () => {
    const state = authSlice.reducer(authenticatedState, logout());

    // console.log(state);

    expect(state).toEqual({
      status: 'unauthenticated',
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: undefined
    });
  });

  it('should logout the user and throw an error message', () => {
    const errorMessage = 'Credential are not valid';

    const state = authSlice.reducer(
      authenticatedState,
      logout({
        errorMessage
      })
    );

    // console.log(state);
    expect(state).toEqual({
      status: 'unauthenticated',
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: errorMessage
    });
  });

  it('should change the state to "checking"', () => {
    const state = authSlice.reducer(authenticatedState, checkingCredentials());

    // console.log(state);
    expect(state.status).toBe('checking');
  });
});
