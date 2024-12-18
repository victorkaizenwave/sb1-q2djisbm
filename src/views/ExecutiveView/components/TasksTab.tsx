import React, { useState, useEffect } from 'react';
import { getTasks, Task } from '../../../services/db/taskService';
import { getTeamMembers, TeamMember } from '../../../services/db/teamMemberService';
import { DataPanel } from './DataPanel';
import AddTaskModal from '../../../components/modals/AddTaskModal';
import AddTeamMemberModal from '../../../components/modals/AddTeamMemberModal';
import { UserPlus } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

export const TasksTab = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isAddTeamMemberModalOpen, setIsAddTeamMemberModalOpen] = useState(false);

  const fetchData = async () => {
    const [tasksData, teamMembersData] = await Promise.all([
      getTasks(),
      getTeamMembers()
    ]);
    setTasks(tasksData);
    setTeamMembers(teamMembersData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { key: 'name', header: 'Task Name' },
    { 
      key: 'due', 
      header: 'Due Date',
      render: (date: string) => new Date(date).toLocaleDateString()
    },
    {
      key: 'assignTo',
      header: 'Assigned To',
      render: (assignTo: string) => {
        const teamMember = teamMembers.find(tm => tm.id === assignTo);
        return teamMember ? teamMember.name : 'Unassigned';
      }
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (status: string) => (
        <span className={`px-3 py-1 rounded-full ${
          status === 'completed' ? 'bg-green-100 text-green-800' :
          status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Task Management</h2>
        <div className="flex space-x-4">
          <Button
            variant="outline"
            icon={UserPlus}
            onClick={() => setIsAddTeamMemberModalOpen(true)}
          >
            Add Team Member
          </Button>
        </div>
      </div>

      <DataPanel
        title="Tasks"
        buttonLabel="Add Task"
        data={tasks}
        columns={columns}
        onAdd={() => setIsAddTaskModalOpen(true)}
      />

      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
        onTaskAdded={fetchData}
      />

      <AddTeamMemberModal
        isOpen={isAddTeamMemberModalOpen}
        onClose={() => setIsAddTeamMemberModalOpen(false)}
        onTeamMemberAdded={fetchData}
      />
    </div>
  );
};