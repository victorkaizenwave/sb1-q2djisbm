import React, { useState, useEffect } from 'react';
import { getClients, Client } from '../../../services/db/clientService';
import { DataPanel } from './DataPanel';
import AddClientModal from '../../../components/modals/AddClientModal';

export const ClientsTab = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const fetchClients = async () => {
    const data = await getClients();
    setClients(data);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const columns = [
    { key: 'company', header: 'Company Name' },
    { key: 'pointOfContact', header: 'Contact Person' },
    { key: 'email', header: 'Email' },
    { 
      key: 'outreachStatus', 
      header: 'Status',
      render: (status: string) => (
        <span className={`px-3 py-1 rounded-full ${
          status === 'active' ? 'bg-green-100 text-green-800' :
          status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      )
    },
    { 
      key: 'createdAt', 
      header: 'Created',
      render: (date: string) => new Date(date).toLocaleDateString()
    }
  ];

  return (
    <>
      <DataPanel
        title="Clients"
        buttonLabel="Add Client"
        data={clients}
        columns={columns}
        onAdd={() => setIsAddModalOpen(true)}
      />

      <AddClientModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onClientAdded={fetchClients}
      />
    </>
  );
};