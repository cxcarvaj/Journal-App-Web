import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';

import { LoginPage } from '../../../src/auth/pages';
import { authSlice } from '../../../src/store/auth';
import {
  startGoogleLogin,
  startLoginWithEmailAndPassword
} from '../../../src/store/auth/thunks';
import { unauthenticatedState } from '../../fixtures/authFixtures';

const mockStartGoogleLogin = jest.fn();
const mockStartLoginWithEmailAndPassword = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
  startGoogleLogin: () => mockStartGoogleLogin,
  startLoginWithEmailAndPassword: ({ email, password }) => {
    return () => mockStartLoginWithEmailAndPassword({ email, password });
  }
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => (fn) => fn()
}));

const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  },
  preloadedState: {
    auth: unauthenticatedState
  }
});

describe('Tests in <LoginPage />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should render the component correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    // screen.debug();
    expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
  });

  it('should render the google button and call the startGoogleLogin function', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const googleButton = screen.getByTestId('google-login-button');
    fireEvent.click(googleButton);

    expect(mockStartGoogleLogin).toHaveBeenCalled();
  });

  it('should call the submit function with startLoginWithEmailAndPassword', () => {
    const email = 'user@google.com';
    const password = '123456';

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailField = screen.getByRole('textbox', { name: 'Email' });
    fireEvent.change(emailField, { target: { name: 'email', value: email } });

    const passwordField = screen.getByTestId('password');
    fireEvent.change(passwordField, {
      target: { name: 'password', value: password }
    });

    const loginForm = screen.getByTestId('submit-form');
    fireEvent.submit(loginForm);

    expect(mockStartLoginWithEmailAndPassword).toHaveBeenCalledWith({
      email,
      password
    });
  });
});
