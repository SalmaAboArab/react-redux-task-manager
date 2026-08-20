import React from 'react';
import { PRIORITIES } from '../redux/tasksSlice';

const STATUSES = ['All', 'Active', 'Completed'];

export default function FilterBar({
  priorityFilter,
  onPriorityChange,
  statusFilter,
  onStatusChange,
  counts,
}) {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <span className="filter-label">Priority</span>
        <div className="tab-row">
          {['All', ...PRIORITIES].map((p) => (
            <button
              key={p}
              type="button"
              className={`tab tab--${p.toLowerCase()} ${priorityFilter === p ? 'is-active' : ''}`}
              onClick={() => onPriorityChange(p)}
              aria-pressed={priorityFilter === p}
            >
              {p}
              {p !== 'All' && <span className="tab-count">{counts.byPriority[p] ?? 0}</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <span className="filter-label">Status</span>
        <div className="tab-row">
          {STATUSES.map((s) => (
            <button
              key={s}
              type="button"
              className={`tab ${statusFilter === s ? 'is-active' : ''}`}
              onClick={() => onStatusChange(s)}
              aria-pressed={statusFilter === s}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <p className="filter-summary">
        {counts.completed} of {counts.total} closed out
      </p>
    </div>
  );
}
