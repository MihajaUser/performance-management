//frontend/app/(protected)/employees/components/EmployeeHeader.tsx
"use client";

import { Card, CardBody } from "@heroui/react";

interface EmployeeHeaderProps {
  title?: string; // ✅ Nouveau champ pour personnaliser le titre
  firstname: string;
  lastname: string;
  department: string;
  jobTitle: string;
  status?: string;
  matricule?: string;
  period?: string;
}

export function EmployeeHeader({
  title = "Fiche employé", // ✅ Valeur par défaut
  firstname,
  lastname,
  department,
  jobTitle,
  status,
  matricule,
  period,
}: EmployeeHeaderProps) {
  return (
    <div className="space-y-4">
      {/* En-tête principale */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
          {title}
        </h1>

        {period && (
          <p className="text-xs text-gray-500 mt-1">
            Période d’évaluation :{" "}
            <span className="font-medium text-[#002B5B]">{period}</span>
          </p>
        )}
      </div>

      {/* Carte d’infos employé */}
      <Card shadow="sm" className="border border-gray-200">
        <CardBody className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div>
            <p className="text-gray-500">Nom</p>
            <p className="font-medium text-[#002B5B]">
              {firstname} {lastname}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Département</p>
            <p className="font-medium text-[#002B5B]">{department}</p>
          </div>

          <div>
            <p className="text-gray-500">Poste</p>
            <p className="font-medium text-[#002B5B]">{jobTitle}</p>
          </div>

          <div>
            <p className="text-gray-500">Statut</p>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
              {status === "active" && (
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
              )}
              <span className="font-medium text-[#002B5B]">
                {status === "active" ? "Actif" : status ?? "—"}
              </span>
            </div>
          </div>

          <div>
            <p className="text-gray-500">Matricule</p>
            <p className="font-medium text-[#002B5B]">{matricule ?? "—"}</p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
