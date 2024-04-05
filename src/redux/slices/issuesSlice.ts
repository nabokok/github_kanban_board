
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Issue } from '../../types/Github';
import { fetchAllIssues } from '../../api/githubApi';

interface IssuesState {
  issues: Issue[];
  loading: boolean;
  error: string;
}

const initialState: IssuesState = {
  issues: [],
  loading: false,
  error: '',
};

export const fetchIssues = createAsyncThunk(
  'issues/fetch',
  async (url: string): Promise<Issue[]> => {
    const response = await fetchAllIssues(url);
    return response;
  },
);

const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIssues.pending, (state) => {
      state.error = '';
      state.loading = true;
    });

    builder.addCase(fetchIssues.fulfilled, (state, action) => {
      state.loading = false;
      state.issues = action.payload;
    });

    builder.addCase(fetchIssues.rejected, (state) => {
      state.loading = false;
      state.error = 'Something went wrong';
    });
  },
});

export default issuesSlice.reducer;
export const { actions } = issuesSlice;
