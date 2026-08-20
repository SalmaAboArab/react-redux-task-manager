import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { taskAdded, PRIORITIES } from '../redux/tasksSlice';

export default function TaskForm() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      setError('Give the entry a title before filing it.');
      return;
    }
    dispatch(taskAdded(trimmed, priority));
    setTitle('');
    setPriority('Medium');
    setError('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-form__row">
        <input
          type="text"
          className="task-form__input"
          placeholder="New entry — what needs doing?"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError('');
          }}
          aria-label="Task title"
        />
        <select
          className="task-form__select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          aria-label="Task priority"
        >
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <button type="submit" className="task-form__submit">
          File it
        </button>
      </div>
      {error && <p className="task-form__error">{error}</p>}
    </form>
  );
}
