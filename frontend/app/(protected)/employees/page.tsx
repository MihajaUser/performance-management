"use client";

import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Select,
  SelectItem,
  Button,
} from "@heroui/react";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import { useEmployeesQuery } from "./hooks/useEmployeesQuery";
import { EmployeeTable } from "./components/EmployeeTable";

export default function EmployeesPage() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const { data, isLoading, isError } = useEmployeesQuery({
    search,
    department,
    status,
  });

  const employees = data?.data ?? [];

  return (
    <div className="space-y-6">
      {/* --- Titre --- */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
          Gestion des employés
        </h1>
      </div>

      {/* --- Carte des filtres --- */}
      <Card shadow="sm" className="border border-gray-200">
        <CardHeader className="pb-0">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
            {/* Champ recherche */}
            <Input
              aria-label="Recherche d'employé"
              placeholder="nom, prenom ou email..."
              startContent={<Search className="text-gray-400 w-5 h-5" />}
              value={search}
              onValueChange={setSearch}
              variant="bordered"
              size="sm"
              classNames={{
                inputWrapper:
                  "bg-white border-gray-300 hover:border-gray-400 shadow-sm h-11 rounded-lg transition-all",
                input: "text-gray-800 placeholder:text-gray-400",
              }}
            />

            {/* Département */}
            <Select
              placeholder="Département"
              variant="bordered"
              size="sm"
              selectedKeys={department ? [department] : []}
              onSelectionChange={(keys) =>
                setDepartment(Array.from(keys)[0] ?? "")
              }
              classNames={{
                trigger:
                  "relative bg-white border-gray-300 hover:border-gray-400 shadow-sm h-11 rounded-lg transition-all",
                value: "text-gray-800 text-sm",
                selectorIcon:
                  "absolute right-3 text-gray-400 w-4 h-4 pointer-events-none",
                popoverContent:
                  "z-[50] bg-white shadow-lg border border-gray-200 rounded-lg",
              }}
              popoverProps={{ placement: "bottom-start", className: "z-[60]" }}
            >
              <SelectItem key="">Tous</SelectItem>
              <SelectItem key="Informatique">Informatique</SelectItem>
              <SelectItem key="Ressources Humaines">
                Ressources Humaines
              </SelectItem>
              <SelectItem key="Finance">Finance</SelectItem>
              <SelectItem key="Marketing">Marketing</SelectItem>
            </Select>

            {/* Statut */}
            <Select
              placeholder="Statut"
              variant="bordered"
              size="sm"
              selectedKeys={status ? [status] : []}
              onSelectionChange={(keys) => setStatus(Array.from(keys)[0] ?? "")}
              classNames={{
                trigger:
                  "relative bg-white border-gray-300 hover:border-gray-400 shadow-sm h-11 rounded-lg transition-all",
                value: "text-gray-800 text-sm",
                selectorIcon:
                  "absolute right-3 text-gray-400 w-4 h-4 pointer-events-none",
                popoverContent:
                  "z-[50] bg-white shadow-lg border border-gray-200 rounded-lg",
              }}
              popoverProps={{ placement: "bottom-start", className: "z-[60]" }}
            >
              <SelectItem key="">Tous</SelectItem>
              <SelectItem key="active">Actif</SelectItem>
              <SelectItem key="on_leave">En congé</SelectItem>
              <SelectItem key="inactive">Inactif</SelectItem>
            </Select>

            {/* Bouton Ajouter */}
            <div className="flex justify-end">
              <Button
                color="primary"
                variant="flat"
                startContent={<Plus className="w-4 h-4" />}
                className="h-11 text-sm bg-[#002B5B]/10 hover:bg-[#002B5B]/20 text-[#002B5B] font-normal shadow-none border border-gray-200 rounded-lg px-4 transition-all"
              >
                Ajouter un employé
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* --- Corps --- */}
        <CardBody className="pt-4">
          {isLoading ? (
            <p className="text-gray-500 text-sm italic">
              Chargement des données...
            </p>
          ) : isError ? (
            <p className="text-red-500 text-sm italic">
              Une erreur est survenue lors du chargement.
            </p>
          ) : (
            <EmployeeTable rows={employees} />
          )}
        </CardBody>
      </Card>
    </div>
  );
}
