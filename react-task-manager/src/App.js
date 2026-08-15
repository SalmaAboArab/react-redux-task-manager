import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTaskCounts } from './redux/tasksSlice';
import TaskForm from './components/TaskForm';
import FilterBar from './components/FilterBar';
import TaskList from './components/TaskList';
import './styles/index.css';

export default function App() {
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const counts = useSelector(selectTaskCounts);

  return (
    <div className="page">
      <header className="masthead">
        <p className="masthead__eyebrow">Vol. I — Daily Ledger</p>
        <h1 className="masthead__title">Task Manager</h1>
        <p className="masthead__subtitle">
          File it, stamp it, cross it off. Everything here stays put in your browser.
        </p>
      </header>

      <main className="ledger">
        <TaskForm />
        <FilterBar
          priorityFilter={priorityFilter}
          onPriorityChange={setPriorityFilter}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          counts={counts}
        />
        <TaskList priorityFilter={priorityFilter} statusFilter={statusFilter} />
      </main>
    </div>
  );
}
