import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';
import { loadTasks, saveTasks } from './localStorage';

// Rehydrate on load — falls back to undefined so the slice's own
// default initial state kicks in when nothing is stored yet.
const persistedTasks = loadTasks();

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  preloadedState: persistedTasks ? { tasks: { items: persistedTasks } } : undefined,
});

// Persist on every change. A subscriber is simpler and more reliable
// here than a custom middleware, since it fires after the state has
// already settled.
store.subscribe(() => {
  saveTasks(store.getState().tasks.items);
});
