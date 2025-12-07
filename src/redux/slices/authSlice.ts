import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginApi } from '../../api/authApi';
import { AuthState } from '../../../src/redux/types/authTypes';

const initialState: AuthState = {
  data: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  '/api/v1/login',
  async ({ mobile_no,country_code}: { mobile_no: string; country_code:string;}, { rejectWithValue }) => {
    try {
      return await loginApi(mobile_no,country_code);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Login failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
