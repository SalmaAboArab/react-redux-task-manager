import { createSlice, nanoid } from "@reduxjs/toolkit";

const PRIORITIES = ["high", "medium", "low"];

const initialTasks = [
  {
    id: nanoid(),
    title: "Sketch the ledger layout",
    priority: "high",
    completed: false,
  },
  {
    id: nanoid(),
    title: "Wire up localStorage persistence",
    priority: "medium",
    completed: false,
  },
  { id: nanoid(), title: "Write the README", priority: "low", completed: true },
];

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: initialTasks,
  },
  reducers: {
    create: (state, action) => {
      const { taskName, priority } = action.payload;
      const newTask = {
        id: nanoid(),
        title: taskName,
        priority: priority,
        completed: false,
      };
      state.tasks.push(newTask);
    },
    edit: (state, action) => {
      const { id, taskName, priority } = action.payload;
      const task = state.tasks.find((task) => task?.id === id);
      if (task) {
        task.title = taskName;
        task.priority = priority;
      }
    },
    toggleComplete: (state, action) => {
      const { id } = action.payload;
      const task = state.tasks.find((task) => task.id === id);

      if (task) {
        task.completed = !task.completed;
      }
    },
  },
});

export const { create, edit, toggleComplete } = tasksSlice.actions;

export const selectTaskCounts = (state: any) => {
  const items = state.tasks.tasks;

  return {
    total: items.length,

    completed: items.filter((task: any) => task.completed).length,

    byPriority: PRIORITIES.reduce(
      (acc, priority) => {
        acc[priority] = items.filter(
          (task: any) => task.priority === priority,
        ).length;

        return acc;
      },
      {} as Record<(typeof PRIORITIES)[number], number>,
    ),
  };
};

export default tasksSlice.reducer;
