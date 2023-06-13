import { checkingCredentials } from '../../../src/store/auth/authSlice';
import { checkingAuthentication } from '../../../src/store/auth/thunks';

jest.mock('../../../src/firebase/providers', () => ({
  FirebaseAuth: jest.fn()
}));

jest.mock('../../../src/store/auth/authSlice', () => ({
  checkingCredentials: jest.fn()
}));

jest.mock('../../../src/store/journal/thunks', () => ({}));

describe('Tests on AuthThunks', () => {
  const dispatch = jest.fn();

  afterEach(() => jest.clearAllMocks());

  it('should invoke the checkingCredentials action', async () => {
    await checkingAuthentication()(dispatch);

    expect(dispatch).toHaveBeenCalled();

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });
});
