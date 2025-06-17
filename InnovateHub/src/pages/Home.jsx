import React from 'react';
import Card from '../components/Card';
import TaskManager from '../components/TaskManager';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card title="Task Manager" variant="elevated" className="min-h-[500px]">
        <TaskManager />
      </Card>
      
      <Card title="API Data" variant="outlined">
        <p className="text-gray-500 dark:text-gray-400">
          Fetch and display data from an API here
        </p>
      </Card>
    </div>
  );
}