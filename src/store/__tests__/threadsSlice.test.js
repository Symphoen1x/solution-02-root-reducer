import threadsReducer, { setCategoryFilter } from '../threadsSlice';

describe('threadsReducer', () => {
  it('should handle setCategoryFilter', () => {
    const initialState = {
      threads: [],
      loading: false,
      error: null,
      categoryFilter: '',
    };
    const action = setCategoryFilter('react');
    const nextState = threadsReducer(initialState, action);
    expect(nextState.categoryFilter).toEqual('react');
  });

  it('should handle asyncGetAllThreads.pending', () => {
    const initialState = {
      threads: [],
      loading: false,
      error: null,
      categoryFilter: '',
    };
    const action = { type: 'threads/getAll/pending' };
    const nextState = threadsReducer(initialState, action);
    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBeNull();
  });
});