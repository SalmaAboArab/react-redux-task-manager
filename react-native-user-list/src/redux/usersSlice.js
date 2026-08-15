import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { formatAddress } from '../utils/formatAddress';
import { loadCachedUsers, saveCachedUsers } from '../utils/userCache';

const API_URL = 'https://jsonplaceholder.typicode.com/users';
export const PAGE_SIZE = 4;

function transformUser(raw) {
  return {
    id: raw.id,
    name: raw.name,
    email: raw.email,
    address: formatAddress(raw.address),
  };
}

/**
 * Loads whatever is cached from a previous session so the list can render
 * instantly (and works fully offline). Does not hit the network — that's
 * fetchUsersPage's job.
 */
export const hydrateFromCache = createAsyncThunk('users/hydrateFromCache', async () => {
  const cached = await loadCachedUsers();
  return cached; // may be null if nothing was cached yet
});

/**
 * Fetches one page of users from the API using json-server style
 * `_page` / `_limit` query params (jsonplaceholder is built on json-server,
 * so this paginates for real rather than faking it client-side).
 * On success, merges the page into the cache so the app stays usable
 * offline next time.
 */
export const fetchUsersPage = createAsyncThunk(
  'users/fetchUsersPage',
  async (page, { getState, rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}?_page=${page}&_limit=${PAGE_SIZE}`);
      if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
      const raw = await response.json();
      const transformed = raw.map(transformUser);

      const { users } = getState().users;
      const mergedById = new Map(users.map((u) => [u.id, u]));
      transformed.forEach((u) => mergedById.set(u.id, u));
      const merged = Array.from(mergedById.values());

      const hasMore = transformed.length === PAGE_SIZE;
      await saveCachedUsers({ users: merged, page, hasMore });

      return { users: transformed, page, hasMore };
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to fetch users');
    }
  }
);

const initialState = {
  users: [],
  page: 0,
  hasMore: true,
  searchQuery: '',
  status: 'idle', // idle | loading | loadingMore | succeeded | failed
  error: null,
  isOffline: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    searchQueryChanged(state, action) {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- cache hydration (instant, offline-friendly) ---
      .addCase(hydrateFromCache.fulfilled, (state, action) => {
        if (action.payload) {
          state.users = action.payload.users;
          state.page = action.payload.page;
          state.hasMore = action.payload.hasMore;
        }
      })
      // --- network fetch ---
      .addCase(fetchUsersPage.pending, (state, action) => {
        state.status = action.meta.arg === 1 ? 'loading' : 'loadingMore';
        state.error = null;
      })
      .addCase(fetchUsersPage.fulfilled, (state, action) => {
        const { users, page, hasMore } = action.payload;
        const byId = new Map(state.users.map((u) => [u.id, u]));
        users.forEach((u) => byId.set(u.id, u));
        state.users = Array.from(byId.values());
        state.page = page;
        state.hasMore = hasMore;
        state.status = 'succeeded';
        state.isOffline = false;
      })
      .addCase(fetchUsersPage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
        // If we already have cached users, treat this as "offline mode"
        // rather than a hard error screen.
        state.isOffline = state.users.length > 0;
      });
  },
});

export const { searchQueryChanged } = usersSlice.actions;

// --- Selectors ---
export const selectUsersState = (state) => state.users;

export const selectFilteredUsers = (state) => {
  const { users, searchQuery } = state.users;
  if (!searchQuery.trim()) return users;
  const q = searchQuery.trim().toLowerCase();
  return users.filter((u) => u.name.toLowerCase().includes(q));
};

export default usersSlice.reducer;
