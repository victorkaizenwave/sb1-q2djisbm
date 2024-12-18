import React from 'react';
import { Calendar, Folder } from 'lucide-react';
import { format } from 'date-fns';
import type { Task } from '../../services/db/taskService';
import type { Project } from '../../services/db/projectService';

interface CreatorTaskCardProps {
  task: Task;
  project?: Project;
}

export const CreatorTaskCard: React.FC<CreatorTaskCardProps> = ({ task, project }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">{task.name}</h3>
      
      <div className="space-y-3">
        <div className="flex items-center text-gray-600">
          <Calendar className="w-5 h-5 mr-2" />
          <span>Due: {format(new Date(task.due), 'MMM dd, yyyy')}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <Folder className="w-5 h-5 mr-2" />
          <span>Project: {project?.name || 'Unknown Project'}</span>
        </div>

        <div className="mt-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium
            ${task.status === 'completed' ? 'bg-green-100 text-green-800' : 
              task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 
              'bg-yellow-100 text-yellow-800'}`}>
            {task.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </span>
        </div>
      </div>
    </div>
  );
};