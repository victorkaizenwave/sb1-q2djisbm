import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Users, Crown, UserPlus } from 'lucide-react';
import { getClients, Client } from '../services/db/clientService';
import { getTeamMembers, TeamMember } from '../services/db/teamMemberService';
import { useStore } from '../store/useStore';
import AddTeamMemberModal from '../components/modals/AddTeamMemberModal';

const PortalCard = ({ 
  icon: Icon, 
  title, 
  description,
  onSelect,
  options,
  selectedId,
  isExecutive = false,
  onAddTeamMember
}: { 
  icon: React.ElementType;
  title: string;
  description: string;
  onSelect: (id?: string) => void;
  options?: { id: string; name: string }[];
  selectedId?: string | null;
  isExecutive?: boolean;
  onAddTeamMember?: () => void;
}) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
      <div 
        className={`flex flex-col items-center text-center ${isExecutive ? 'cursor-pointer' : ''}`}
        onClick={() => isExecutive && onSelect()}
      >
        <div className="bg-blue-50 p-4 rounded-full mb-6">
          <Icon className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        
        {!isExecutive && options && (
          <div className="w-full space-y-4">
            <select
              value={selectedId || ''}
              onChange={(e) => onSelect(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select {title.split(' ')[0]}</option>
              {options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
            
            {onAddTeamMember && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddTeamMember();
                }}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <UserPlus size={18} />
                <span>Add {title.split(' ')[0]}</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState<Client[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isAddTeamMemberModalOpen, setIsAddTeamMemberModalOpen] = useState(false);
  const { selectedClient, selectedCreator, setSelectedClient, setSelectedCreator } = useStore();

  const fetchData = async () => {
    const [clientsData, teamMembersData] = await Promise.all([
      getClients(),
      getTeamMembers()
    ]);
    setClients(clientsData);
    setTeamMembers(teamMembersData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClientSelect = (clientId?: string) => {
    if (clientId) {
      setSelectedClient(clientId);
      navigate('/client');
    }
  };

  const handleCreatorSelect = (creatorId?: string) => {
    if (creatorId) {
      setSelectedCreator(creatorId);
      navigate('/creator');
    }
  };

  const handleExecutiveSelect = () => {
    navigate('/executive');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="w-20 h-20 mx-auto mb-6 bg-blue-600 rounded-full flex items-center justify-center">
            <div className="w-12 h-12 bg-white rounded-full transform translate-x-1"></div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Kaizen Wave</h1>
          <p className="text-xl text-gray-600">Select your portal to continue</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <PortalCard
            icon={Briefcase}
            title="Client Portal"
            description="Access your projects and analytics"
            onSelect={handleClientSelect}
            options={clients.map(client => ({
              id: client.id!,
              name: client.company
            }))}
            selectedId={selectedClient}
          />
          <PortalCard
            icon={Users}
            title="Team Member Dashboard"
            description="Manage tasks and collaborate"
            onSelect={handleCreatorSelect}
            options={teamMembers.map(member => ({
              id: member.id!,
              name: member.name
            }))}
            selectedId={selectedCreator}
            onAddTeamMember={() => setIsAddTeamMemberModalOpen(true)}
          />
          <PortalCard
            icon={Crown}
            title="Executive Dashboard"
            description="Overview of all operations"
            onSelect={handleExecutiveSelect}
            isExecutive={true}
          />
        </div>
      </div>

      <AddTeamMemberModal
        isOpen={isAddTeamMemberModalOpen}
        onClose={() => setIsAddTeamMemberModalOpen(false)}
        onTeamMemberAdded={fetchData}
      />
    </div>
  );
};

export default LandingPage;