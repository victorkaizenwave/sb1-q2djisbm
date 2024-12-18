import React, { useState, useEffect } from 'react';
import { getProjects, Project } from '../../../services/db/projectService';
import { DataPanel } from './DataPanel';
import AddProjectModal from '../../../components/modals/AddProjectModal';

export const ProjectsTab = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const fetchProjects = async () => {
    const data = await getProjects();
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const columns = [
    { key: 'name', header: 'Project Name' },
    { 
      key: 'value', 
      header: 'Value',
      render: (value: number) => `$${value.toLocaleString()}`
    },
    { 
      key: 'due', 
      header: 'Due Date',
      render: (date: string) => new Date(date).toLocaleDateString()
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (status: string) => (
        <span className={`px-3 py-1 rounded-full ${
          status === 'active' ? 'bg-green-100 text-green-800' :
          status === 'completed' ? 'bg-blue-100 text-blue-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
        </span>
      )
    }
  ];

  return (
    <>
      <DataPanel
        title="Projects"
        buttonLabel="Add Project"
        data={projects}
        columns={columns}
        onAdd={() => setIsAddModalOpen(true)}
      />

      <AddProjectModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onProjectAdded={fetchProjects}
      />
    </>
  );
};