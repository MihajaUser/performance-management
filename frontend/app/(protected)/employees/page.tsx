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
import { Search } from "lucide-react";
import { useState } from "react";
import { useEmployeesQuery } from "./hooks/useEmployeesQuery";
import { EmployeeTable } from "./components/EmployeeTable";

export default function EmployeesPage() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const { data, isLoading, isError, refetch } = useEmployeesQuery({
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {/* Champ recherche */}
            <Input
              aria-label="Recherche d'employé"
              placeholder="Rechercher par nom, poste ou service..."
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
            <Select
              placeholder="Département"
              variant="bordered"
              size="sm"
              selectedKeys={department ? [department] : []}
              onChange={(e) => setDepartment(e.target.value)}
              classNames={{
                trigger:
                  "relative bg-white border-gray-300 hover:border-gray-400 shadow-sm h-11 rounded-lg transition-all data-[open=true]:border-primary/60 data-[focus-visible=true]:border-primary/60",
                value: "text-gray-800 text-sm",
                selectorIcon:
                  "absolute right-3 text-gray-400 w-4 h-4 pointer-events-none",
                popoverContent:
                  "z-[50] bg-white shadow-lg border border-gray-200 rounded-lg",
              }}
              popoverProps={{
                placement: "bottom-start",
                className: "z-[60]",
              }}
            >
              <SelectItem key="">Tous</SelectItem>
              <SelectItem key="Informatique">Informatique</SelectItem>
              <SelectItem key="Ressources Humaines">
                Ressources Humaines
              </SelectItem>
              <SelectItem key="Finance">Finance</SelectItem>
              <SelectItem key="Marketing">Marketing</SelectItem>
            </Select>

            <Select
              placeholder="Statut"
              variant="bordered"
              size="sm"
              selectedKeys={status ? [status] : []}
              onChange={(e) => setStatus(e.target.value)}
              classNames={{
                trigger:
                  "relative bg-white border-gray-300 hover:border-gray-400 shadow-sm h-11 rounded-lg transition-all data-[open=true]:border-primary/60 data-[focus-visible=true]:border-primary/60",
                value: "text-gray-800 text-sm",
                selectorIcon:
                  "absolute right-3 text-gray-400 w-4 h-4 pointer-events-none",
                popoverContent:
                  "z-[50] bg-white shadow-lg border border-gray-200 rounded-lg",
              }}
              popoverProps={{
                placement: "bottom-start",
                className: "z-[60]",
              }}
            >
              <SelectItem key="">Tous</SelectItem>
              <SelectItem key="active">Actif</SelectItem>
              <SelectItem key="on_leave">En congé</SelectItem>
              <SelectItem key="inactive">Inactif</SelectItem>
            </Select>

            {/* Bouton recherche */}
            <Button
              color="primary"
              variant="solid"
              onPress={() => refetch()}
              className="h-11 font-medium mt-6 md:mt-0"
            >
              Rechercher
            </Button>
          </div>
        </CardHeader>

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
