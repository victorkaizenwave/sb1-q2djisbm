import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { addProject } from '../../services/db/projectService';
import { getClients, Client } from '../../services/db/clientService';
import { getTeamMembers, TeamMember } from '../../services/db/teamMemberService';
import type { Project } from '../../services/db/projectService';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectAdded: () => void;
}

const AddProjectModal: React.FC<AddProjectModalProps> = ({ isOpen, onClose, onProjectAdded }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    due: '',
    owner: '',
    relatedNotes: '',
    status: 'active',
    value: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const [clientsData, teamMembersData] = await Promise.all([
        getClients(),
        getTeamMembers()
      ]);
      setClients(clientsData);
      setTeamMembers(teamMembersData);
    };
    fetchData();
  }, []);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProject: Omit<Project, 'id'> = {
      ...formData,
      projectTasks: [],
      createdAt: new Date().toISOString(),
    };

    try {
      await addProject(newProject);
      onProjectAdded();
      onClose();
      setFormData({
        name: '',
        company: '',
        due: '',
        owner: '',
        relatedNotes: '',
        status: 'active',
        value: 0,
      });
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Add New Project</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Project Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700">
              Client
            </label>
            <select
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Select a client</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.company}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="owner" className="block text-sm font-medium text-gray-700">
              Project Owner
            </label>
            <select
              id="owner"
              value={formData.owner}
              onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Select a team member</option>
              {teamMembers.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="due" className="block text-sm font-medium text-gray-700">
              Due Date
            </label>
            <input
              type="date"
              id="due"
              value={formData.due}
              onChange={(e) => setFormData({ ...formData, due: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as Project['status'] })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="on-hold">On Hold</option>
            </select>
          </div>

          <div>
            <label htmlFor="value" className="block text-sm font-medium text-gray-700">
              Project Value
            </label>
            <input
              type="number"
              id="value"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label htmlFor="relatedNotes" className="block text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea
              id="relatedNotes"
              value={formData.relatedNotes}
              onChange={(e) => setFormData({ ...formData, relatedNotes: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Add Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectModal;