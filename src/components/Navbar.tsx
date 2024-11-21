import React from 'react';
import { Moon, Sun, Code2 } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

const Navbar = () => {
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <nav className="border-b dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Code2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                TaskFlow Pro
              </span>
              <span className="text-xs text-gray-600 dark:text-gray-400">by Kirtan Desai</span>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;