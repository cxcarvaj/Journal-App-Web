import {
  registerWithEmailAndPassword,
  signInWithGoogle
} from '../../firebase/providers';
import { checkingCredentials, login, logout } from './authSlice';

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleLogin = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await signInWithGoogle();

    if (!result.ok) return dispatch(logout(result.errorMessage));

    delete result.ok;
    dispatch(login(result));
  };
};

export const startCreatingUserWithEmailAndPassword = ({
  email,
  password,
  displayName
}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const { ok, uid, photoURL, errorMessage } =
      await registerWithEmailAndPassword({
        email,
        password,
        displayName
      });
    if (!ok) return dispatch(logout({ errorMessage }));

    dispatch(login({ uid, photoURL, email, displayName }));
  };
};
