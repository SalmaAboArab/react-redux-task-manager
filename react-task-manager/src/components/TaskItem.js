import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { taskDeleted, taskEdited, taskToggled, PRIORITIES } from '../redux/tasksSlice';

export default function TaskItem({ task, rotation }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(task.title);
  const [draftPriority, setDraftPriority] = useState(task.priority);

  const startEdit = () => {
    setDraftTitle(task.title);
    setDraftPriority(task.priority);
    setIsEditing(true);
  };

  const commitEdit = () => {
    const trimmed = draftTitle.trim();
    if (!trimmed) {
      // Don't allow an empty title to overwrite the task — just cancel.
      setIsEditing(false);
      return;
    }
    dispatch(taskEdited({ id: task.id, title: trimmed, priority: draftPriority }));
    setIsEditing(false);
  };

  const cancelEdit = () => setIsEditing(false);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') commitEdit();
    if (e.key === 'Escape') cancelEdit();
  };

  return (
    <li
      className={`task-card task-card--${task.priority.toLowerCase()} ${task.completed ? 'is-completed' : ''}`}
      style={{ '--tilt': `${rotation}deg` }}
    >
      <span className="task-card__tab">{task.priority}</span>

      <button
        type="button"
        className="task-card__seal"
        onClick={() => dispatch(taskToggled(task.id))}
        aria-pressed={task.completed}
        aria-label={task.completed ? 'Mark task active' : 'Mark task complete'}
      >
        {task.completed && <span className="task-card__seal-mark" />}
      </button>

      <div className="task-card__body">
        {isEditing ? (
          <div className="task-card__edit">
            <input
              type="text"
              className="task-card__edit-input"
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            <select
              className="task-card__edit-select"
              value={draftPriority}
              onChange={(e) => setDraftPriority(e.target.value)}
            >
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <div className="task-card__edit-actions">
              <button type="button" className="link-btn" onClick={commitEdit}>
                Save
              </button>
              <button type="button" className="link-btn link-btn--muted" onClick={cancelEdit}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="task-card__title">{task.title}</p>
            <div className="task-card__actions">
              <button type="button" className="link-btn" onClick={startEdit}>
                Edit
              </button>
              <button
                type="button"
                className="link-btn link-btn--danger"
                onClick={() => dispatch(taskDeleted(task.id))}
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </li>
  );
}
