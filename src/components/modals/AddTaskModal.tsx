import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { addTask } from '../../services/db/taskService';
import { getProjects, Project } from '../../services/db/projectService';
import { getTeamMembers, TeamMember } from '../../services/db/teamMemberService';
import type { Task } from '../../services/db/taskService';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskAdded: () => void;
  initialProjectId?: string;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ 
  isOpen, 
  onClose, 
  onTaskAdded,
  initialProjectId 
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    project: initialProjectId || '',
    assignTo: '',
    due: '',
    status: 'pending' as Task['status'],
  });

  useEffect(() => {
    const fetchData = async () => {
      const [projectsData, teamMembersData] = await Promise.all([
        getProjects(),
        getTeamMembers()
      ]);
      setProjects(projectsData);
      setTeamMembers(teamMembersData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (initialProjectId) {
      setFormData(prev => ({ ...prev, project: initialProjectId }));
    }
  }, [initialProjectId]);

  if (!isOpen) return null;

  const selectedProject = projects.find(p => p.id === formData.project);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newTask: Omit<Task, 'id'> = {
      ...formData,
      customer: selectedProject?.company || '',
      createdAt: new Date().toISOString(),
    };

    try {
      await addTask(newTask);
      onTaskAdded();
      onClose();
      setFormData({
        name: '',
        project: initialProjectId || '',
        assignTo: '',
        due: '',
        status: 'pending',
      });
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Add New Task</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Task Name
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
            <label htmlFor="project" className="block text-sm font-medium text-gray-700">
              Project
            </label>
            <select
              id="project"
              value={formData.project}
              onChange={(e) => setFormData({ ...formData, project: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Select a project</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="assignTo" className="block text-sm font-medium text-gray-700">
              Assign To
            </label>
            <select
              id="assignTo"
              value={formData.assignTo}
              onChange={(e) => setFormData({ ...formData, assignTo: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, status: e.target.value as Task['status'] })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
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
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;