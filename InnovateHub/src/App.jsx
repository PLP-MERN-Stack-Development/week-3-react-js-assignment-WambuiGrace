import './App.css';

// Import components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Card from './components/Card';
import TaskManager from './components/TaskManager';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />

      <main className="flex-grow py-6 px-4 sm:px-6">
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
      </main>

      <Footer />
    </div>
  );
}

export default App;