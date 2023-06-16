import {
  logInWithGoogle,
  logOutFirebase,
  loginWithEmailAndPassword,
  registerWithEmailAndPassword
} from '../../../src/firebase/providers';
import { checkingCredentials, login, logout } from '../../../src/store/auth';
import {
  checkingAuthentication,
  startCreatingUserWithEmailAndPassword,
  startGoogleLogin,
  startLoginWithEmailAndPassword,
  startLogout
} from '../../../src/store/auth/thunks';
import { clearNotesLogOut } from '../../../src/store/journal';
import { demoUser } from '../../fixtures/authFixtures';

jest.mock('../../../src/firebase/config', () => ({
  FirebaseAuth: jest.fn()
}));

jest.mock('../../../src/firebase/providers');

jest.mock('../../../src/helpers/uploadFile', () => ({
  uploadFile: jest.fn()
}));

describe('Tests on AuthThunks', () => {
  const dispatch = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  it('should invoke the checkingCredentials action', async () => {
    await checkingAuthentication()(dispatch);

    expect(dispatch).toHaveBeenCalled();

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });

  it('should check that startGoogleLogin invoke the checkingCredentials and login actions successfully', async () => {
    const loginData = { ok: true, ...demoUser };
    await logInWithGoogle.mockResolvedValue(loginData);

    await startGoogleLogin()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  it('should check that startGoogleLogin invoke the checkingCredentials and logout actions unsuccessfully', async () => {
    const loginData = { ok: false, errorMessage: 'Error with Google' };
    await logInWithGoogle.mockResolvedValue(loginData);

    await startGoogleLogin()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
  });

  it('should check that startLoginWithEmailAndPassword invoke the checkingCredentials and login actions successfully', async () => {
    const loginData = { ok: true, ...demoUser };
    const formData = { email: demoUser.email, password: '123456' };

    const { uid, photoURL, displayName } = loginData;

    await loginWithEmailAndPassword.mockResolvedValue(loginData);

    await startLoginWithEmailAndPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(
      login({ uid, photoURL, displayName, email: formData.email })
    );
  });

  it('should check that startLoginWithEmailAndPassword invoke the checkingCredentials and login actions unsuccessfully', async () => {
    const loginData = {
      ok: false,
      errorMessage: 'Error while login with your email and password'
    };
    const formData = { email: demoUser.email, password: '123456' };

    await loginWithEmailAndPassword.mockResolvedValue(loginData);

    await startLoginWithEmailAndPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(
      logout({ errorMessage: loginData.errorMessage })
    );
  });

  it('should check that startCreatingUserWithEmailAndPassword invoke the checkingCredentials and login actions successfully', async () => {
    const loginData = { ok: true, ...demoUser };
    const formData = {
      email: demoUser.email,
      password: '123456',
      displayName: demoUser.displayName
    };

    const { ok, uid, photoURL, displayName } = loginData;
    await registerWithEmailAndPassword.mockResolvedValue({
      ok,
      uid,
      photoURL,
      displayName
    });

    await startCreatingUserWithEmailAndPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(
      login({ uid, photoURL, displayName, email: formData.email })
    );
  });

  it('should check that startCreatingUserWithEmailAndPassword invoke the checkingCredentials and login actions unsuccessfully', async () => {
    const loginData = {
      ok: false,
      errorMessage: 'Error while creating your account'
    };
    const formData = {
      email: demoUser.email,
      password: '123456',
      displayName: demoUser.displayName
    };

    const { ok, uid, photoURL, errorMessage } = loginData;
    await registerWithEmailAndPassword.mockResolvedValue({
      ok,
      uid,
      photoURL,
      errorMessage
    });

    await startCreatingUserWithEmailAndPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(
      logout({ errorMessage: loginData.errorMessage })
    );
  });

  it('should check that startLogout invoke the logoutFirebase, clearNotes, and logout actions successfully', async () => {
    await startLogout()(dispatch);

    expect(logOutFirebase).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(logout({}));
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogOut());
  });
});

//startLogout
