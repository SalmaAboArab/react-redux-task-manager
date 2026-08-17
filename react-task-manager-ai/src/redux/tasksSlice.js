import { createSlice, nanoid } from '@reduxjs/toolkit';

export const PRIORITIES = ['High', 'Medium', 'Low'];

const seedTasks = [
  { id: nanoid(), title: 'Sketch the ledger layout', priority: 'High', completed: false },
  { id: nanoid(), title: 'Wire up localStorage persistence', priority: 'Medium', completed: false },
  { id: nanoid(), title: 'Write the README', priority: 'Low', completed: true },
];

const initialState = {
  items: seedTasks,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    taskAdded: {
      reducer(state, action) {
        state.items.unshift(action.payload);
      },
      prepare(title, priority) {
        return {
          payload: {
            id: nanoid(),
            title: title.trim(),
            priority,
            completed: false,
          },
        };
      },
    },
    taskEdited(state, action) {
      const { id, title, priority } = action.payload;
      const task = state.items.find((t) => t.id === id);
      if (!task) return;
      if (title !== undefined) task.title = title.trim();
      if (priority !== undefined) task.priority = priority;
    },
    taskDeleted(state, action) {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
    taskToggled(state, action) {
      const task = state.items.find((t) => t.id === action.payload);
      if (task) task.completed = !task.completed;
    },
  },
});

export const { taskAdded, taskEdited, taskDeleted, taskToggled } = tasksSlice.actions;

// Selectors live next to the slice so components never reach into
// state shape directly.
export const selectAllTasks = (state) => state.tasks.items;

export const selectVisibleTasks = (state, priorityFilter, statusFilter) => {
  return state.tasks.items.filter((task) => {
    const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;
    const matchesStatus =
      statusFilter === 'All' ||
      (statusFilter === 'Active' && !task.completed) ||
      (statusFilter === 'Completed' && task.completed);
    return matchesPriority && matchesStatus;
  });
};

export const selectTaskCounts = (state) => {
  const items = state.tasks.items;
  return {
    total: items.length,
    completed: items.filter((t) => t.completed).length,
    byPriority: PRIORITIES.reduce((acc, p) => {
      acc[p] = items.filter((t) => t.priority === p).length;
      return acc;
    }, {}),
  };
};

export default tasksSlice.reducer;
