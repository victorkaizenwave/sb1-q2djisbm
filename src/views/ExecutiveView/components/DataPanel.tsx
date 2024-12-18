import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { DataTable } from '../../../components/tables/DataTable';

interface Column {
  key: string;
  header: string;
  render?: (value: any) => React.ReactNode;
}

interface DataPanelProps {
  title: string;
  buttonLabel: string;
  data: any[];
  columns: Column[];
  onAdd: () => void;
}

export const DataPanel: React.FC<DataPanelProps> = ({
  title,
  buttonLabel,
  data,
  columns,
  onAdd,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <Button variant="secondary" icon={PlusCircle} onClick={onAdd}>
          {buttonLabel}
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={data}
        onEdit={(item) => console.log('Edit item:', item)}
      />
    </div>
  );
};