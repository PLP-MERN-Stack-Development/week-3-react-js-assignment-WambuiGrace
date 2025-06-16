import { useState } from 'react';
import './App.css';

// Import components
import Button from './components/Button';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Card from './components/Card';
import TaskManager from './components/TaskManager';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Card title="Counter Example" className="mb-6">
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg mb-4">
              Edit <code className="font-mono bg-gray-200 dark:bg-gray-700 p-1 rounded"> src/App.jsx </code> and save to test HMR
            </p>
            
            <div className="flex items-center gap-4 my-4">
              <Button 
                variant="danger" 
                onClick={() => setCount((count) => count - 1)}
              >
                -
              </Button>
              <span className="text-xl font-bold">{count}</span>
              <Button 
                variant="success" 
                onClick={() => setCount((count) => count + 1)}
              >
                +
              </Button>
            </div>
          </div>
        </Card>
        
        <Card title="Task Manager" variant="elevated" className="mb-6">
          <TaskManager />
        </Card>
        
        <Card title="API Data" variant="outlined">
          <p className="text-gray-500 dark:text-gray-400">
            Fetch and display data from an API here
          </p>
        </Card>
      </main>

      <Footer />
    </div>
  );
}

export default App;