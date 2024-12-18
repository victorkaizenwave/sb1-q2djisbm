import React from 'react';
import { Calendar, User } from 'lucide-react';
import { format } from 'date-fns';
import type { Project } from '../../services/db/projectService';
import type { TeamMember } from '../../services/db/teamMemberService';

interface ClientProjectCardProps {
  project: Project;
  teamMember?: TeamMember;
}

export const ClientProjectCard: React.FC<ClientProjectCardProps> = ({ project, teamMember }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{project.name}</h3>
      
      <div className="space-y-3">
        <div className="flex items-center text-gray-600">
          <Calendar className="w-5 h-5 mr-2" />
          <span>Due: {format(new Date(project.due), 'MMM dd, yyyy')}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <User className="w-5 h-5 mr-2" />
          <span>Owner: {teamMember?.name || 'Unassigned'}</span>
        </div>

        <div className="mt-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium
            ${project.status === 'active' ? 'bg-green-100 text-green-800' : 
              project.status === 'completed' ? 'bg-blue-100 text-blue-800' : 
              'bg-yellow-100 text-yellow-800'}`}>
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
};