import React from 'react';
import { Toaster } from 'sonner';
import Navbar from './components/Navbar';
import TaskBoard from './components/TaskBoard';
import { useThemeStore } from './store/themeStore';

function App() {
  const isDark = useThemeStore((state) => state.isDark);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <TaskBoard />
      </main>
      <footer className="border-t dark:border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Designed & Developed with ❤️ by <span className="font-semibold">Kirtan Desai</span>
          </p>
        </div>
      </footer>
      <Toaster position="top-right" theme={isDark ? 'dark' : 'light'} />
    </div>
  );
}

export default App;