# Ledger — React Task Manager

A task manager built with React hooks and Redux Toolkit. Tasks persist to
`localStorage`, so they survive a refresh.

## Run it

```bash
npm install
npm start
```

Opens at http://localhost:3000.

## Project structure

```
src/
  redux/
    store.js               # configureStore + preloadedState from localStorage
    localStorage.js         # load/save helpers, isolated for testability
    tasksSlice.js            # createSlice: reducers + selectors for tasks
  components/
    TaskForm.js             # add a task (title + priority)
    FilterBar.js             # priority + status filter controls
    TaskList.js               # connects to Redux, applies filters
    TaskItem.js                # one task: toggle, inline edit, delete
  styles/
    index.css
  App.js
  index.js
```

## How state flows

- **Redux Toolkit** (`@reduxjs/toolkit`) holds the single list of tasks —
  `{ id, title, priority, completed }` — in `tasksSlice.js`. `createSlice`
  generates the action creators (`taskAdded`, `taskEdited`, `taskDeleted`,
  `taskToggled`) and lets reducers use direct mutation syntax (Immer handles
  the immutability under the hood).
- **Selectors** (`selectVisibleTasks`, `selectTaskCounts`) live next to the
  slice, so components never reach into `state.tasks.items` directly — they
  ask for exactly the derived data they need.
- **Local UI state** — which priority/status filter is active, and the
  in-progress edit draft for a task — stays in component state via
  `useState`. It's transient and specific to one component, so it doesn't
  belong in the global store.
- **Persistence** is a thin layer, not baked into the slice: `store.js` reads
  `localStorage` once on startup (`preloadedState`) and subscribes to the
  store to write back on every change. That keeps `tasksSlice.js` a plain,
  easily-testable reducer with no side effects.

## Features implemented

- Add, edit (inline), delete, and toggle completion for tasks.
- Filter by priority (`All / High / Medium / Low`).
- Filter by status (`All / Active / Completed`) as a small bonus on top of
  the priority filter.
- Tasks persist across page reloads via `localStorage`.

## Design

Styled as a paper ledger/index-card system: task cards are stamped with a
priority tab, completion is a wax-seal toggle, and the page uses a serif
display face (Source Serif 4) paired with a monospace utility face (IBM Plex
Mono) for labels and metadata. All styling is plain CSS in
`src/styles/index.css` — no UI framework dependency.
