import type { TaskType } from "../components/types";

const STORAGE_KEY = 'ledger.tasks.v1';

export function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : undefined;
  } catch (err) {
    console.warn('Ledger: could not read saved tasks, starting fresh.', err);
    return undefined;
  }
}

export function saveTasks(tasks: TaskType[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (err) {
    console.warn('Ledger: could not save tasks.', err);
  }
}
