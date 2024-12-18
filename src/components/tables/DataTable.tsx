import React from 'react';

interface Column {
  key: string;
  header: string;
  render?: (value: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  onEdit?: (item: any) => void;
}

export const DataTable: React.FC<DataTableProps> = ({ columns, data, onEdit }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left border-b border-gray-200">
            {columns.map((column) => (
              <th key={column.key} className="pb-3 font-semibold text-gray-600">
                {column.header}
              </th>
            ))}
            {onEdit && <th className="pb-3 font-semibold text-gray-600">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b border-gray-100">
              {columns.map((column) => (
                <td key={`${item.id}-${column.key}`} className="py-4">
                  {column.render ? column.render(item[column.key]) : item[column.key]}
                </td>
              ))}
              {onEdit && (
                <td className="py-4">
                  <button
                    onClick={() => onEdit(item)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};