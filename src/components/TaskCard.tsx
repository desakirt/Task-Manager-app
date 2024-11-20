import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Calendar, GripVertical, Edit2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Task } from '../types';
import { format } from 'date-fns';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const priorityColors = {
    low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      ref={setNodeRef}
      style={style}
      className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 dark:text-white">{task.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{task.description}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {task.tags.map((tag) => (
              <motion.span
                key={tag}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(task)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors"
          >
            <Edit2 className="w-4 h-4 text-gray-400" />
          </button>
          <button
            {...attributes}
            {...listeners}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors"
          >
            <GripVertical className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {format(new Date(task.dueDate), 'MMM d, yyyy')}
          </span>
        </div>
        <motion.span
          whileHover={{ scale: 1.05 }}
          className={`text-xs px-2 py-1 rounded-full ${priorityColors[task.priority]}`}
        >
          {task.priority}
        </motion.span>
      </div>
    </motion.div>
  );
};

export default TaskCard;