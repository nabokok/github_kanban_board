
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchOneRepo } from '../../api/githubApi';
import { Repo } from '../../types/Github';

interface RepoState {
  repo: Repo | null;
  loading: boolean;
  error: string;
}

const initialState: RepoState = {
  repo: null,
  loading: false,
  error: '',
};

export const fetchRepo = createAsyncThunk(
  'repo/fetch',
  async (url: string): Promise<Repo> => {
    const response = await fetchOneRepo(url);
    return response;
  },
);

const repoSlice = createSlice({
  name: 'repo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRepo.pending, (state) => {
      state.error = '';
      state.loading = true;
    });

    builder.addCase(fetchRepo.fulfilled, (state, action) => {
      state.loading = false;
      state.repo = action.payload;
    });

    builder.addCase(fetchRepo.rejected, (state) => {
      state.loading = false;
      state.error = 'Something went wrong';
    });
  },
});

export default repoSlice.reducer;
export const { actions } = repoSlice;
