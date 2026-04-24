import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getThreadDetail,
  createComment,
  upVoteComment,
  downVoteComment,
  neutralVoteComment,
} from '../api';
import {
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralVoteThread,
} from './threadsSlice';

export const asyncGetThreadDetail = createAsyncThunk(
  'threadDetail/get',
  async (threadId, { rejectWithValue }) => {
    try {
      const detail = await getThreadDetail(threadId);
      return detail;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncCreateComment = createAsyncThunk(
  'threadDetail/createComment',
  async ({ token, threadId, content }, { rejectWithValue }) => {
    try {
      const comment = await createComment(token, threadId, content);
      return comment;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncUpVoteComment = createAsyncThunk(
  'threadDetail/upVoteComment',
  async ({ token, threadId, commentId, userId }, { rejectWithValue }) => {
    try {
      await upVoteComment(token, threadId, commentId);
      return { commentId, userId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncDownVoteComment = createAsyncThunk(
  'threadDetail/downVoteComment',
  async ({ token, threadId, commentId, userId }, { rejectWithValue }) => {
    try {
      await downVoteComment(token, threadId, commentId);
      return { commentId, userId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncNeutralVoteComment = createAsyncThunk(
  'threadDetail/neutralVoteComment',
  async ({ token, threadId, commentId, userId }, { rejectWithValue }) => {
    try {
      await neutralVoteComment(token, threadId, commentId);
      return { commentId, userId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const threadDetailSlice = createSlice({
  name: 'threadDetail',
  initialState: {
    threadDetail: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearThreadDetail(state) {
      state.threadDetail = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncGetThreadDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.threadDetail = null;
      })
      .addCase(asyncGetThreadDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.threadDetail = action.payload;
      })
      .addCase(asyncGetThreadDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(asyncCreateComment.fulfilled, (state, action) => {
        if (state.threadDetail) {
          state.threadDetail.comments.unshift(action.payload);
        }
      })
      .addCase(asyncUpVoteComment.pending, (state, action) => {
        const { commentId, userId } = action.meta.arg;
        if (state.threadDetail) {
          const comment = state.threadDetail.comments.find((c) => c.id === commentId);
          if (comment) {
            comment.downVotesBy = comment.downVotesBy.filter((id) => id !== userId);
            if (!comment.upVotesBy.includes(userId)) {
              comment.upVotesBy.push(userId);
            }
          }
        }
      })
      .addCase(asyncDownVoteComment.pending, (state, action) => {
        const { commentId, userId } = action.meta.arg;
        if (state.threadDetail) {
          const comment = state.threadDetail.comments.find((c) => c.id === commentId);
          if (comment) {
            comment.upVotesBy = comment.upVotesBy.filter((id) => id !== userId);
            if (!comment.downVotesBy.includes(userId)) {
              comment.downVotesBy.push(userId);
            }
          }
        }
      })
      .addCase(asyncNeutralVoteComment.pending, (state, action) => {
        const { commentId, userId } = action.meta.arg;
        if (state.threadDetail) {
          const comment = state.threadDetail.comments.find((c) => c.id === commentId);
          if (comment) {
            comment.upVotesBy = comment.upVotesBy.filter((id) => id !== userId);
            comment.downVotesBy = comment.downVotesBy.filter((id) => id !== userId);
          }
        }
      })
      // Thread Votes Optimistic
      .addCase(asyncUpVoteThread.pending, (state, action) => {
        const { threadId, userId } = action.meta.arg;
        if (state.threadDetail && state.threadDetail.id === threadId) {
          state.threadDetail.downVotesBy = (state.threadDetail.downVotesBy || []).filter((id) => id !== userId);
          if (!(state.threadDetail.upVotesBy || []).includes(userId)) {
            state.threadDetail.upVotesBy = [...(state.threadDetail.upVotesBy || []), userId];
          }
        }
      })
      .addCase(asyncDownVoteThread.pending, (state, action) => {
        const { threadId, userId } = action.meta.arg;
        if (state.threadDetail && state.threadDetail.id === threadId) {
          state.threadDetail.upVotesBy = (state.threadDetail.upVotesBy || []).filter((id) => id !== userId);
          if (!(state.threadDetail.downVotesBy || []).includes(userId)) {
            state.threadDetail.downVotesBy = [...(state.threadDetail.downVotesBy || []), userId];
          }
        }
      })
      .addCase(asyncNeutralVoteThread.pending, (state, action) => {
        const { threadId, userId } = action.meta.arg;
        if (state.threadDetail && state.threadDetail.id === threadId) {
          state.threadDetail.upVotesBy = (state.threadDetail.upVotesBy || []).filter((id) => id !== userId);
          state.threadDetail.downVotesBy = (state.threadDetail.downVotesBy || []).filter((id) => id !== userId);
        }
      });
  },
});



export const { clearThreadDetail } = threadDetailSlice.actions;
export default threadDetailSlice.reducer;

