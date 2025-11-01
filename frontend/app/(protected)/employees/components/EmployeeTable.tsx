"use client";

import Link from "next/link";

type Row = {
  id: number;
  firstname: string;
  lastname: string;
  email?: string;
  department: string;
  jobTitle: string;
  status?: string;
  score?: number;
};

export function EmployeeTable({ rows }: { rows: Row[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="border-b text-gray-500">
          <tr>
            <th className="py-2">Nom</th>
            <th>Département</th>
            <th>Poste</th>
            <th>Statut</th>
            <th className="text-right">Score</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-b last:border-none">
              <td className="py-2">
                <div className="flex flex-col">
                  <span className="font-medium">{r.firstname} {r.lastname}</span>
                  {r.email && <span className="text-xs text-gray-500">{r.email}</span>}
                </div>
              </td>
              <td>{r.department}</td>
              <td>{r.jobTitle}</td>
              <td>{r.status ?? "Active"}{""}</td>
              <td className="text-right">{typeof r.score === "number" ? r.score.toFixed(2) : "-"}</td>
              <td className="text-right">
                <Link className="text-primary hover:underline" href={`/ (protected)/employees/${r.id}`.replace(" /(protected)", "")}>
                  Voir fiche →
                </Link>
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={6} className="py-6 text-center text-gray-500">Aucun résultat</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
