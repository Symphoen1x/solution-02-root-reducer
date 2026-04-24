import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllThreads,
  createThread,
  upVoteThread,
  downVoteThread,
  neutralVoteThread,
} from '../api';

export const asyncGetAllThreads = createAsyncThunk(
  'threads/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const threads = await getAllThreads();
      return threads;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncCreateThread = createAsyncThunk(
  'threads/create',
  async ({ token, title, body, category }, { rejectWithValue }) => {
    try {
      const thread = await createThread(token, { title, body, category });
      return thread;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncUpVoteThread = createAsyncThunk(
  'threads/upVote',
  async ({ token, threadId, userId }, { rejectWithValue }) => {
    try {
      await upVoteThread(token, threadId);
      return { threadId, userId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncDownVoteThread = createAsyncThunk(
  'threads/downVote',
  async ({ token, threadId, userId }, { rejectWithValue }) => {
    try {
      await downVoteThread(token, threadId);
      return { threadId, userId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncNeutralVoteThread = createAsyncThunk(
  'threads/neutralVote',
  async ({ token, threadId, userId }, { rejectWithValue }) => {
    try {
      await neutralVoteThread(token, threadId);
      return { threadId, userId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const threadsSlice = createSlice({
  name: 'threads',
  initialState: {
    threads: [],
    loading: false,
    error: null,
    categoryFilter: '',
  },
  reducers: {
    setCategoryFilter(state, action) {
      state.categoryFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncGetAllThreads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncGetAllThreads.fulfilled, (state, action) => {
        state.loading = false;
        state.threads = action.payload;
      })
      .addCase(asyncGetAllThreads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(asyncCreateThread.fulfilled, (state, action) => {
        state.threads.unshift(action.payload);
      })
      // Optimistic: upvote
      .addCase(asyncUpVoteThread.pending, (state, action) => {
        const { threadId, userId } = action.meta.arg;
        const thread = state.threads.find((t) => t.id === threadId);
        if (thread) {
          thread.downVotesBy = (thread.downVotesBy || []).filter((id) => id !== userId);
          if (!(thread.upVotesBy || []).includes(userId)) {
            thread.upVotesBy = [...(thread.upVotesBy || []), userId];
          }
        }
      })
      // Optimistic: downvote
      .addCase(asyncDownVoteThread.pending, (state, action) => {
        const { threadId, userId } = action.meta.arg;
        const thread = state.threads.find((t) => t.id === threadId);
        if (thread) {
          thread.upVotesBy = (thread.upVotesBy || []).filter((id) => id !== userId);
          if (!(thread.downVotesBy || []).includes(userId)) {
            thread.downVotesBy = [...(thread.downVotesBy || []), userId];
          }
        }
      })
      // Optimistic: neutral
      .addCase(asyncNeutralVoteThread.pending, (state, action) => {
        const { threadId, userId } = action.meta.arg;
        const thread = state.threads.find((t) => t.id === threadId);
        if (thread) {
          thread.upVotesBy = (thread.upVotesBy || []).filter((id) => id !== userId);
          thread.downVotesBy = (thread.downVotesBy || []).filter((id) => id !== userId);
        }
      });
  },
});


export const { setCategoryFilter } = threadsSlice.actions;
export default threadsSlice.reducer;
