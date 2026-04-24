import authReducer, { logout, clearError } from '../authSlice';

describe('authReducer', () => {
  it('should return initial state when passed an empty action', () => {
    const initialState = undefined;
    const action = { type: '' };
    const nextState = authReducer(initialState, action);
    expect(nextState).toEqual({
      authUser: null,
      token: null,
      loading: false,
      error: null,
    });
  });

  it('should handle logout action', () => {
    const initialState = {
      authUser: { id: 1, name: 'User' },
      token: 'fake-token',
      loading: false,
      error: null,
    };
    const action = logout();
    const nextState = authReducer(initialState, action);
    expect(nextState.authUser).toBeNull();
    expect(nextState.token).toBeNull();
  });

  it('should handle clearError action', () => {
    const initialState = {
      authUser: null,
      token: null,
      loading: false,
      error: 'Some error message',
    };
    const action = clearError();
    const nextState = authReducer(initialState, action);
    expect(nextState.error).toBeNull();
  });
});
