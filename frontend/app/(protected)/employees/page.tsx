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
    <>
      <h1 className="text-2xl font-semibold text-gray-800">Employés</h1>

      <Card shadow="sm">
        <CardHeader>
          <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-3">
            <Input
              placeholder="Rechercher…"
              value={search}
              onValueChange={setSearch}
            />
            <Select
              label="Département"
              onChange={(e) => setDepartment(e.target.value)}
            >
              <SelectItem key="">Tous</SelectItem>
              <SelectItem key="Informatique">Informatique</SelectItem>
              <SelectItem key="Ressources Humaines">
                Ressources Humaines
              </SelectItem>
            </Select>
            <Select label="Statut" onChange={(e) => setStatus(e.target.value)}>
              <SelectItem key="">Tous</SelectItem>
              <SelectItem key="active">Actif</SelectItem>
              <SelectItem key="on_leave">En congé</SelectItem>
            </Select>
            <Button variant="flat" onPress={() => refetch()}>
              Rechercher
            </Button>
          </div>
        </CardHeader>

        <CardBody>
          {isLoading ? (
            <p className="text-gray-500">Chargement...</p>
          ) : isError ? (
            <p className="text-red-500">Erreur lors du chargement.</p>
          ) : (
            <EmployeeTable rows={employees} />
          )}
        </CardBody>
      </Card>
    </>
  );
}
