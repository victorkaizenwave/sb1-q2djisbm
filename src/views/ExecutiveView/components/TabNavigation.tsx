import React from 'react';
import { Users, FolderKanban, CheckSquare, UserCircle } from 'lucide-react';
import { TabButton } from '../../../components/ui/TabButton';
import type { TabType } from '..';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex space-x-4 mb-8">
      <TabButton
        icon={Users}
        label="Clients"
        isActive={activeTab === 'clients'}
        onClick={() => onTabChange('clients')}
      />
      <TabButton
        icon={FolderKanban}
        label="Projects"
        isActive={activeTab === 'projects'}
        onClick={() => onTabChange('projects')}
      />
      <TabButton
        icon={CheckSquare}
        label="Tasks"
        isActive={activeTab === 'tasks'}
        onClick={() => onTabChange('tasks')}
      />
      <TabButton
        icon={UserCircle}
        label="Team"
        isActive={activeTab === 'team'}
        onClick={() => onTabChange('team')}
      />
    </div>
  );
};