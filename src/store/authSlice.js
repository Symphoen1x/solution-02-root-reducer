import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, register, getOwnProfile } from '../api';

const TOKEN_KEY = 'fundisc_token';

export const asyncRegisterUser = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const user = await register({ name, email, password });
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncLoginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await login({ email, password });
      localStorage.setItem(TOKEN_KEY, data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncGetOwnProfile = createAsyncThunk(
  'auth/getOwnProfile',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) return null;
      const user = await getOwnProfile(token);
      return { user, token };
    } catch (error) {
      localStorage.removeItem(TOKEN_KEY);
      return rejectWithValue(error.message);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authUser: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.authUser = null;
      state.token = null;
      localStorage.removeItem(TOKEN_KEY);
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncLoginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncLoginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.authUser = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(asyncLoginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(asyncRegisterUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncRegisterUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(asyncRegisterUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(asyncGetOwnProfile.fulfilled, (state, action) => {
        if (action.payload) {
          state.authUser = action.payload.user;
          state.token = action.payload.token;
        }
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
