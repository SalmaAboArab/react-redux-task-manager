import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasks-slice";
import { loadTasks, saveTasks } from "./local-storage";
import type { TaskType } from "../components/types";

const persistedTasks = loadTasks();

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },

  preloadedState: persistedTasks
    ? {
        tasks: {
          tasks: persistedTasks,
        },
      }
    : undefined,
});

store.subscribe(() => {
  saveTasks(store.getState().tasks.tasks as TaskType[]);
});

export default store;
