"use client";

import { useRouter } from "next/navigation";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { Icon } from "@iconify/react";

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
  const router = useRouter();

  const handleDetails = (id: number) => {
    router.push(`/employees/${id}`);
  };

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
                <span className="text-sm text-gray-900">
                  {r.department.name}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm text-gray-900">{r.jobTitle.name}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    r.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {r.status === "active" ? "Actif" : r.status || "-"}
                </span>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-right">
                <div className="flex justify-end">
                  <Dropdown>
                    <DropdownTrigger>
                      <button className="cursor-pointer p-1 hover:bg-gray-100 rounded transition-colors">
                        <Icon
                          icon="iconamoon:menu-kebab-vertical-fill"
                          className="text-[20px] text-gray-600 hover:text-gray-800 transition-colors"
                        />
                      </button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Actions employé"
                      className="bg-white shadow-lg rounded-lg border border-gray-200"
                      itemClasses={{
                        base: [
                          "text-sm",
                          "text-gray-700",
                          "data-[hover=true]:bg-gray-50",
                          "data-[hover=true]:text-gray-900",
                          "transition-colors",
                        ],
                      }}
                    >
                      <DropdownItem
                        key="evaluation"
                        onPress={() => {
                          // void handleNewEvaluation(r.id);
                        }}
                      >
                        Nouvelle évaluation
                      </DropdownItem>

                      <DropdownItem
                        key="details"
                        onPress={() => handleDetails(r.id)}
                      >
                        Détails
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
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
