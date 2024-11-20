import React from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import TaskCard from './TaskCard';
import { Task } from '../types';

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  onAddTask: () => void;
  onEditTask: (task: Task) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ title, tasks, onAddTask, onEditTask }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-700 dark:text-gray-300">{title}</h2>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onAddTask}
          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
          aria-label="Add task"
        >
          <Plus className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </motion.button>
      </div>
      <motion.div
        layout
        className="space-y-3"
      >
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onEdit={onEditTask} />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default TaskColumn;