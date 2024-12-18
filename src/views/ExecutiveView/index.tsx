import React, { useState } from 'react';
import { TabNavigation } from './components/TabNavigation';
import { ClientsTab } from './components/ClientsTab';
import { ProjectsTab } from './components/ProjectsTab';
import { TasksTab } from './components/TasksTab';
import { TeamMembersTab } from './components/TeamMembersTab';

export type TabType = 'clients' | 'projects' | 'tasks' | 'team';

const ExecutiveView = () => {
  const [activeTab, setActiveTab] = useState<TabType>('clients');

  return (
    <div className="max-w-6xl mx-auto">
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      {activeTab === 'clients' && <ClientsTab />}
      {activeTab === 'projects' && <ProjectsTab />}
      {activeTab === 'tasks' && <TasksTab />}
      {activeTab === 'team' && <TeamMembersTab />}
    </div>
  );
};

export default ExecutiveView;