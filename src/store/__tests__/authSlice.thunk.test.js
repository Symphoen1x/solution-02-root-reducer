import { asyncLoginUser } from '../authSlice';
import * as api from '../../api';

jest.mock('../../api'); // Mock the whole api module

describe('asyncLoginUser thunk', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch fulfilled action with token and user on successful login', async () => {
    // Arrange
    const fakeToken = 'token.valid';
    const fakeData = { token: fakeToken, user: { id: 1, name: 'John Doe' } };
    api.login.mockResolvedValue(fakeData);
    const dispatch = jest.fn();
    const getState = jest.fn();

    // Act
    const result = await asyncLoginUser({ email: 'test@mail.com', password: 'password' })(dispatch, getState, undefined);

    // Assert
    expect(api.login).toHaveBeenCalledWith({ email: 'test@mail.com', password: 'password' });
    expect(result.type).toBe('auth/login/fulfilled');
    expect(result.payload).toEqual(fakeData);
  });

  it('should dispatch rejected action on failed login', async () => {
    // Arrange
    const fakeError = new Error('Invalid credentials');
    api.login.mockRejectedValue(fakeError);
    const dispatch = jest.fn();
    const getState = jest.fn();

    // Act
    const result = await asyncLoginUser({ email: 'test@mail.com', password: 'password' })(dispatch, getState, undefined);

    // Assert
    expect(api.login).toHaveBeenCalledWith({ email: 'test@mail.com', password: 'password' });
    expect(result.type).toBe('auth/login/rejected');
    expect(result.payload).toBe('Invalid credentials');
  });
});
