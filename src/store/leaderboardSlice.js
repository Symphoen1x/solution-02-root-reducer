import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getLeaderboard } from '../api';

export const asyncGetLeaderboard = createAsyncThunk(
  'leaderboard/get',
  async (_, { rejectWithValue }) => {
    try {
      const leaderboard = await getLeaderboard();
      return leaderboard;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState: {
    leaderboard: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(asyncGetLeaderboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(asyncGetLeaderboard.fulfilled, (state, action) => {
        state.loading = false;
        state.leaderboard = action.payload;
      })
      .addCase(asyncGetLeaderboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default leaderboardSlice.reducer;
