import { Eye, Edit2, Trash2 } from 'lucide-react';
import Button from './Button.jsx';

const Table = ({ columns, data, onView, onEdit, onDelete }) => {
  const hasActions = onView || onEdit || onDelete;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-600">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {columns.map((c) => (
              <th key={c.key} scope="col" className="px-6 py-3">{c.label}</th>
            ))}
            {hasActions && <th scope="col" className="px-6 py-3 text-right">Actions</th>}
          </tr>
        </thead>

        <tbody>
          {data && data.length > 0 ? data.map((row) => (
            <tr key={row.id} className="bg-white border-b hover:bg-gray-50">
              {columns.map(col => (
                <td key={col.key} className="px-6 py-4">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
              {hasActions && (
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    {onView && <Button variant="outline" size="sm" icon={<Eye size={16} />} onClick={() => onView(row)}>View</Button>}
                    {onEdit && <Button variant="outline" size="sm" icon={<Edit2 size={16} />} onClick={() => onEdit(row)}>Edit</Button>}
                    {onDelete && <Button variant="danger" size="sm" icon={<Trash2 size={16} />} onClick={() => onDelete(row)}>Delete</Button>}
                  </div>
                </td>
              )}
            </tr>
          )) : (
            <tr>
              <td colSpan={columns.length + (hasActions ? 1 : 0)} className="text-center py-10 text-gray-500">
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
