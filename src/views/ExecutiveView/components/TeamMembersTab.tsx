import React, { useState, useEffect } from 'react';
import { getTeamMembers, TeamMember } from '../../../services/db/teamMemberService';
import { DataPanel } from './DataPanel';
import AddTeamMemberModal from '../../../components/modals/AddTeamMemberModal';

export const TeamMembersTab = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const fetchTeamMembers = async () => {
    const data = await getTeamMembers();
    setTeamMembers(data);
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'role', header: 'Role' },
    { key: 'department', header: 'Department' },
    { key: 'email', header: 'Email' },
    { 
      key: 'active', 
      header: 'Status',
      render: (active: boolean) => (
        <span className={`px-3 py-1 rounded-full ${
          active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {active ? 'Active' : 'Inactive'}
        </span>
      )
    }
  ];

  return (
    <>
      <DataPanel
        title="Team Members"
        buttonLabel="Add Team Member"
        data={teamMembers}
        columns={columns}
        onAdd={() => setIsAddModalOpen(true)}
      />

      <AddTeamMemberModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onTeamMemberAdded={fetchTeamMembers}
      />
    </>
  );
};