# React + Redux Practice Projects

Two standalone apps, kept in one repo since they share the same Redux
patterns and were built as a pair.

```
react-redux-task-manager/
|-- README.md
|-- .gitignore
|-- react-task-manager/        # web app — React + Redux Toolkit
|   |-- src/
|   |   |-- components/          # TaskForm, FilterBar, TaskList, TaskItem
|   |   |-- redux/                # store.js, tasksSlice.js, localStorage.js
|   |   |-- styles/
|   |   |-- App.js
|   |   |-- index.js
|   |-- public/
|   |-- package.json
|-- react-native-user-list/    # Expo app — React Native + Redux Toolkit
|   |-- App.js                    # thin entry point, re-exports src/App.js
|   |-- src/
|   |   |-- components/             # UserCard, SearchBar
|   |   |-- redux/                   # store.js, usersSlice.js
|   |   |-- screens/                  # UserListScreen.js
|   |   |-- utils/                     # formatAddress.js, userCache.js
|   |   |-- App.js
|   |-- package.json
|   |-- app.json
|   |-- babel.config.js
```

Each project has its own `package.json` and its own `README.md` with setup
instructions, since they run independently (`npm install` inside each
folder — there's no shared root `package.json` or workspace tooling here).

## react-task-manager

A task manager (add / edit / delete / toggle complete, filter by priority,
persisted to `localStorage`), built with React hooks and Redux Toolkit.

```bash
cd react-task-manager
npm install
npm start
```

## react-native-user-list

A paginated user list built with Expo, fetching
`https://jsonplaceholder.typicode.com/users`, cached offline with
AsyncStorage, rendered with an optimized `FlatList`.

```bash
cd react-native-user-list
npm install
npx expo start
```

## Why one repo

Both apps lean on the same Redux Toolkit conventions — a `redux/` folder
per project holding `store.js` plus one feature slice, selectors living
next to the slice, and local/transient UI state (filters, search text,
edit drafts) kept out of the store entirely. Keeping them side by side
makes that shared approach easier to compare and reuse.
