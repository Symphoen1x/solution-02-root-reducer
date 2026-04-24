import { asyncGetAllThreads } from '../threadsSlice';
import * as api from '../../api';

jest.mock('../../api');

describe('asyncGetAllThreads thunk', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch fulfilled action with threads array on successful fetch', async () => {
    const fakeThreads = [{ id: 'thread-1', title: 'Test Thread' }];
    api.getAllThreads.mockResolvedValue(fakeThreads);
    const dispatch = jest.fn();
    const getState = jest.fn();

    const result = await asyncGetAllThreads()(dispatch, getState, undefined);

    expect(api.getAllThreads).toHaveBeenCalled();
    expect(result.type).toBe('threads/getAll/fulfilled');
    expect(result.payload).toEqual(fakeThreads);
  });

  it('should dispatch rejected action with error message on failure', async () => {
    const fakeError = new Error('Network error');
    api.getAllThreads.mockRejectedValue(fakeError);
    const dispatch = jest.fn();
    const getState = jest.fn();

    const result = await asyncGetAllThreads()(dispatch, getState, undefined);

    expect(api.getAllThreads).toHaveBeenCalled();
    expect(result.type).toBe('threads/getAll/rejected');
    expect(result.payload).toBe('Network error');
  });
});