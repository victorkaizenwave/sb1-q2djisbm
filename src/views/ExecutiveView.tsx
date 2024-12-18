import React, { useState, useEffect } from 'react';
import { getClients } from '../services/db/clientService';
import { getProjects } from '../services/db/projectService';
import { getTasks } from '../services/db/taskService';
import { Users, FolderKanban, CheckSquare, PlusCircle } from 'lucide-react';
import AddClientModal from '../components/modals/AddClientModal';
import AddProjectModal from '../components/modals/AddProjectModal';
import AddTaskModal from '../components/modals/AddTaskModal';

const ExecutiveView = () => {
  const [activeTab, setActiveTab] = useState<'clients' | 'projects' | 'tasks'>('clients');
  const [data, setData] = useState<any[]>([]);
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  const fetchData = async () => {
    switch (activeTab) {
      case 'clients':
        setData(await getClients());
        break;
      case 'projects':
        setData(await getProjects());
        break;
      case 'tasks':
        setData(await getTasks());
        break;
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleAddButtonClick = () => {
    switch (activeTab) {
      case 'clients':
        setIsAddClientModalOpen(true);
        break;
      case 'projects':
        setIsAddProjectModalOpen(true);
        break;
      case 'tasks':
        setIsAddTaskModalOpen(true);
        break;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('clients')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
            activeTab === 'clients'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Users size={20} />
          <span>Clients</span>
        </button>
        <button
          onClick={() => setActiveTab('projects')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
            activeTab === 'projects'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          <FolderKanban size={20} />
          <span>Projects</span>
        </button>
        <button
          onClick={() => setActiveTab('tasks')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
            activeTab === 'tasks'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          <CheckSquare size={20} />
          <span>Tasks</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h2>
          <button 
            onClick={handleAddButtonClick}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <PlusCircle size={20} />
            <span>Add {activeTab.slice(0, -1)}</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-200">
                <th className="pb-3 font-semibold text-gray-600">Name/Title</th>
                <th className="pb-3 font-semibold text-gray-600">Status</th>
                <th className="pb-3 font-semibold text-gray-600">Created</th>
                <th className="pb-3 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="border-b border-gray-100">
                  <td className="py-4">{item.name || item.company || item.title}</td>
                  <td className="py-4">
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-800">
                      {item.status || item.outreachStatus}
                    </span>
                  </td>
                  <td className="py-4">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4">
                    <button className="text-blue-600 hover:text-blue-800">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddClientModal
        isOpen={isAddClientModalOpen}
        onClose={() => setIsAddClientModalOpen(false)}
        onClientAdded={fetchData}
      />
      <AddProjectModal
        isOpen={isAddProjectModalOpen}
        onClose={() => setIsAddProjectModalOpen(false)}
        onProjectAdded={fetchData}
      />
      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
        onTaskAdded={fetchData}
      />
    </div>
  );
};

export default ExecutiveView;