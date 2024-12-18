import React, { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { getClientProjects, Project } from '../services/db/projectService';
import { getTeamMembers, TeamMember } from '../services/db/teamMemberService';
import { ClientProjectCard } from '../components/client/ClientProjectCard';

const ClientView = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [teamMembers, setTeamMembers] = useState<Record<string, TeamMember>>({});
  const { selectedClient } = useStore();

  useEffect(() => {
    const fetchData = async () => {
      if (selectedClient) {
        const [projectsData, teamMembersData] = await Promise.all([
          getClientProjects(selectedClient),
          getTeamMembers()
        ]);
        
        setProjects(projectsData);
        const teamMembersMap = teamMembersData.reduce((acc, member) => {
          acc[member.id!] = member;
          return acc;
        }, {} as Record<string, TeamMember>);
        setTeamMembers(teamMembersMap);
      }
    };
    
    fetchData();
  }, [selectedClient]);

  if (!selectedClient) {
    return (
      <div className="text-center text-gray-600 mt-8">
        Please select a client from the landing page to view their projects.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Projects</h2>
      
      {projects.length === 0 ? (
        <div className="text-center text-gray-600 mt-8">
          No projects found for this client.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ClientProjectCard
              key={project.id}
              project={project}
              teamMember={teamMembers[project.owner]}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientView;