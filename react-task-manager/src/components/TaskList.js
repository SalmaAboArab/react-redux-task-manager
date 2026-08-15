import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectVisibleTasks } from '../redux/tasksSlice';
import TaskItem from './TaskItem';

// Small deterministic "hand-filed" tilt per card, derived from id so it
// doesn't jump around on re-render.
function tiltFor(id) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) % 1000;
  return (hash % 9) / 10 - 0.4; // roughly -0.4deg to 0.4deg
}

export default function TaskList({ priorityFilter, statusFilter }) {
  const tasks = useSelector((state) => selectVisibleTasks(state, priorityFilter, statusFilter));
  const tilts = useMemo(() => Object.fromEntries(tasks.map((t) => [t.id, tiltFor(t.id)])), [tasks]);

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-state__title">Nothing filed here.</p>
        <p className="empty-state__body">
          Clear a filter, or add a new entry above to start the stack.
        </p>
      </div>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} rotation={tilts[task.id]} />
      ))}
    </ul>
  );
}
