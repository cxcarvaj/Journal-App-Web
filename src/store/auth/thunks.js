import {
  registerWithEmailAndPassword,
  logInWithGoogle,
  loginWithEmailAndPassword,
  logOutFirebase
} from '../../firebase/providers';
import { clearNotesLogOut } from '../journal';
import { checkingCredentials, login, logout } from './authSlice';

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleLogin = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await logInWithGoogle();

    if (!result.ok) return dispatch(logout(result.errorMessage));

    delete result.ok;
    dispatch(login(result));
  };
};

export const startEmailAndPasswordLogin = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const { ok, uid, photoURL, displayName, errorMessage } =
      await loginWithEmailAndPassword({ email, password });

    if (!ok) return dispatch(logout({ errorMessage }));

    dispatch(login({ uid, photoURL, email, displayName }));
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

export const startLogout = () => {
  return async (dispatch) => {
    try {
      await logOutFirebase();
      dispatch(logout({}));
      dispatch(clearNotesLogOut());
    } catch (error) {
      console.log(error);
      dispatch(logout({ errorMessage: error.message }));
    }
  };
};
