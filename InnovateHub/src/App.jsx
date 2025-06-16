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

      <main className="flex-grow max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6">
          <Card title="Task Manager" variant="elevated" className="w-full min-h-[500px]">
            <div className="h-full">
              <TaskManager />
            </div>
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