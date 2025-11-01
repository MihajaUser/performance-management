"use client";

import Link from "next/link";

type Row = {
  id: number;
  firstname: string;
  lastname: string;
  email?: string;
  department: {
    id: number;
    name: string;
    description?: string;
  };
  jobTitle: {
    id: number;
    name: string;
    description?: string;
  };
  status?: string;
  score?: number;
};

export function EmployeeTable({ rows }: { rows: Row[] }) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nom
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Département
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Poste
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Statut
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Score
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rows.map((r) => (
            <tr key={r.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm font-medium text-gray-900">
                  {r.firstname} {r.lastname}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm text-gray-600">{r.email || "-"}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm text-gray-900">{r.department.name}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm text-gray-900">{r.jobTitle.name}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  r.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {r.status === 'active' ? 'Actif' : r.status || '-'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <span className="text-sm font-medium text-gray-900">
                  {typeof r.score === "number" ? r.score.toFixed(2) : "-"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <Link
                  href={`/employees/${r.id}`}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Voir →
                </Link>
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={7} className="px-6 py-12 text-center">
                <span className="text-sm text-gray-500">Aucun résultat</span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}