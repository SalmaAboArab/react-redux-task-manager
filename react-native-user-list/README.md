# Expo User List

A user list app built with Expo, Redux Toolkit, and AsyncStorage, fetching
from `https://jsonplaceholder.typicode.com/users`.

## Run it

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go, or press `i` / `a` for a simulator.

## Project structure

```
App.js                        # root entry point Expo looks for; re-exports src/App.js
src/
  redux/
    store.js                    # configureStore
    usersSlice.js                 # async thunks + reducers + selectors
  components/
    UserCard.js                  # memoized row (name, email, address)
    SearchBar.js
  screens/
    UserListScreen.js             # FlatList + search + Load More
  utils/
    formatAddress.js                # street, city, zipcode -> one string
    userCache.js                     # AsyncStorage read/write
  App.js                              # the actual root component
```

`App.js` lives at the repo root only because Expo's default entry point
(`node_modules/expo/AppEntry.js`) looks for it there — it's a one-line
re-export of `src/App.js`, which is where the real component lives.

## How it works

**API + pagination.** jsonplaceholder is built on `json-server`, so it
actually supports real pagination via query params — this app uses
`?_page=&_limit=` rather than faking pagination by slicing a fully-fetched
array. Page size is 4, so with 10 total users you get three real "Load
more" fetches.

**Redux.** `usersSlice.js` holds `users`, the current `page`, `hasMore`,
`searchQuery`, and request `status`. Two thunks:
- `hydrateFromCache` — reads AsyncStorage on startup so the list renders
  instantly, including fully offline.
- `fetchUsersPage(page)` — fetches a page, transforms it, merges it into
  state by `id` (so re-fetching page 1 doesn't duplicate rows), and writes
  the merged list back to AsyncStorage.

**Offline support.** On launch the app hydrates from cache first, then
tries the network. If the network fetch fails and there's cached data to
fall back on, the UI shows an "Offline — showing cached data" banner with
a Retry button instead of a hard error screen.

**Data transformation.** `formatAddress()` collapses the API's nested
`address: { street, suite, city, zipcode, geo }` into the single
`"street, city, zipcode"` string the spec asks for, isolated as a pure
function so it's unit-testable on its own.

**Search.** Filters the users already loaded into Redux, client-side, by
name. It intentionally filters loaded data rather than querying the API,
since it needs to feel instant as you type. The "Load more" button hides
while a search is active, since it pages the full list, not the filtered
view.

## FlatList performance notes

- `keyExtractor` and a memoized `renderItem` (backed by a `React.memo`
  `UserCard`) so unrelated re-renders (e.g. typing in the search box)
  don't re-render every row.
- `getItemLayout`, since every row has a fixed height (`USER_CARD_HEIGHT`)
  — this lets FlatList skip its own layout measurement pass entirely.
- `initialNumToRender` / `maxToRenderPerBatch` / `windowSize` tuned down
  from the defaults, since this is a short list and there's no reason to
  over-render.
- `removeClippedSubviews` to drop offscreen rows from the native view
  tree on Android.

## A note on scope

jsonplaceholder only has 10 users total, so "pagination" here is real but
small — three pages at 4 per page. The architecture (page-based thunk,
merge-by-id, cache-per-page) is written to scale to a larger dataset
without changes.
