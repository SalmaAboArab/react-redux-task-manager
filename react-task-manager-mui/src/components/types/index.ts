export type PRIORITIES = "All" | "high" | "medium" | "low";
export type TaskDataType = {title: string, priority: PRIORITIES}
export type TaskType = {id: string, title: string, priority: PRIORITIES, completed: boolean}
export type TaskData = {
  taskName: string;
  priority: PRIORITIES;
};
export type Statustype = "All" | "Active" | "Completed"