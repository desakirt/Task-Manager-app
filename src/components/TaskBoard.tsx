import React, { useState } from 'react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { Sparkles, GitBranch } from 'lucide-react';
import { motion } from 'framer-motion';
import TaskColumn from './TaskColumn';
import EditTaskModal from './EditTaskModal';
import { Task } from '../types';
import { toast } from 'sonner';

const TaskBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Implement Authentication Middleware',
      description: 'Add JWT authentication with refresh token rotation',
      status: 'todo',
      priority: 'high',
      dueDate: '2024-03-20',
      tags: ['security', 'backend'],
    },
    {
      id: '2',
      title: 'Optimize Docker Build',
      description: 'Reduce image size and implement multi-stage builds',
      status: 'in-progress',
      priority: 'medium',
      dueDate: '2024-03-18',
      tags: ['devops', 'performance'],
    },
    {
      id: '3',
      title: 'Setup CI/CD Pipeline',
      description: 'Configure GitHub Actions with automated testing',
      status: 'done',
      priority: 'high',
      dueDate: '2024-03-15',
      tags: ['devops', 'automation'],
    },
  ]);

  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeTask = tasks.find((task) => task.id === active.id);
    const overTask = tasks.find((task) => task.id === over.id);

    if (!activeTask || !overTask) return;

    const oldIndex = tasks.indexOf(activeTask);
    const newIndex = tasks.indexOf(overTask);

    setTasks(arrayMove(tasks, oldIndex, newIndex));
    toast.success('Task reordered successfully!');
  };

  const addTask = (status: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: 'New Development Task',
      description: 'Click to edit task details',
      status,
      priority: 'medium',
      dueDate: new Date().toISOString().split('T')[0],
      tags: ['development'],
    };
    setTasks([...tasks, newTask]);
    setEditingTask(newTask);
    toast.success('New task added!');
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
    toast.success('Task updated successfully!');
  };

  const suggestAITask = () => {
    const suggestions = [
      {
        title: 'Implement Rate Limiting',
        description: 'Add API rate limiting using Redis',
        tags: ['backend', 'security'],
      },
      {
        title: 'Setup Kubernetes Monitoring',
        description: 'Configure Prometheus and Grafana for cluster monitoring',
        tags: ['devops', 'monitoring'],
      },
      {
        title: 'Optimize Database Queries',
        description: 'Add indexes and implement query caching',
        tags: ['database', 'performance'],
      },
      {
        title: 'Implement WebSocket Support',
        description: 'Add real-time updates using Socket.io',
        tags: ['backend', 'real-time'],
      },
      {
        title: 'Setup End-to-End Testing',
        description: 'Configure Cypress for E2E test automation',
        tags: ['testing', 'automation'],
      },
    ];
    const suggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    const newTask: Task = {
      id: Date.now().toString(),
      title: suggestion.title,
      description: suggestion.description,
      status: 'todo',
      priority: 'medium',
      dueDate: new Date().toISOString().split('T')[0],
      tags: suggestion.tags,
    };
    setTasks([...tasks, newTask]);
    toast.success('AI suggested a new development task!', {
      icon: '🤖',
    });
  };

  return (
    <>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center space-x-2">
            <GitBranch className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <h1 className="text-2xl font-bold dark:text-white">Development Tasks</h1>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={suggestAITask}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Suggest</span>
          </motion.button>
        </motion.div>
        
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SortableContext items={tasks.map(task => task.id)}>
              <TaskColumn
                title="To Do"
                tasks={tasks.filter(task => task.status === 'todo')}
                onAddTask={() => addTask('todo')}
                onEditTask={setEditingTask}
              />
              <TaskColumn
                title="In Progress"
                tasks={tasks.filter(task => task.status === 'in-progress')}
                onAddTask={() => addTask('in-progress')}
                onEditTask={setEditingTask}
              />
              <TaskColumn
                title="Done"
                tasks={tasks.filter(task => task.status === 'done')}
                onAddTask={() => addTask('done')}
                onEditTask={setEditingTask}
              />
            </SortableContext>
          </div>
        </DndContext>
      </div>

      <EditTaskModal
        task={editingTask}
        isOpen={!!editingTask}
        onClose={() => setEditingTask(null)}
        onSave={updateTask}
      />
    </>
  );
};

export default TaskBoard;