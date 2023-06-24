import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';

import { authSlice } from '../../../src/store/auth';
import { startCreatingUserWithEmailAndPassword } from '../../../src/store/auth/thunks';
import { unauthenticatedState } from '../../fixtures/authFixtures';
import { RegisterPage } from '../../../src/auth/pages/RegisterPage';

const mockStartCreatingUserWithEmailAndPassword = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
  startCreatingUserWithEmailAndPassword: ({ email, password, displayName }) => {
    return () =>
      mockStartCreatingUserWithEmailAndPassword({
        email,
        password,
        displayName
      });
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

describe('Tests in <RegisterPage />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should render the component correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterPage />
        </MemoryRouter>
      </Provider>
    );

    // screen.debug();
    expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
  });

  it('should call the submit function with startCreatingUserWithEmailAndPassword', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterPage />
        </MemoryRouter>
      </Provider>
    );

    const displayName = 'User';
    const email = 'user@google.com';
    const password = '123456';

    const displayNameField = screen.getByRole('textbox', {
      name: 'Complete Name'
    });

    fireEvent.change(displayNameField, {
      target: { name: 'displayName', value: displayName }
    });

    const emailField = screen.getByRole('textbox', { name: 'Email' });

    fireEvent.change(emailField, { target: { name: 'email', value: email } });

    const passwordField = screen.getByTestId('password');

    fireEvent.change(passwordField, {
      target: { name: 'password', value: password }
    });

    const loginForm = screen.getByTestId('submit-form');
    fireEvent.submit(loginForm);

    expect(mockStartCreatingUserWithEmailAndPassword).toHaveBeenCalledWith({
      email,
      password,
      displayName
    });
  });
});
