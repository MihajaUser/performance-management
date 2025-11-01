"use client";

import { Card, CardHeader, CardBody, Input, Select, SelectItem, Button } from "@heroui/react";
import { useMemo, useState } from "react";
import { employees as seedEmployees } from "./data/mockEmployees";
import { EmployeeTable } from "./components/EmployeeTable";

export default function EmployeesPage() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");

  const employees = useMemo(() => {
    return seedEmployees
      .filter(e =>
        `${e.firstname} ${e.lastname}`.toLowerCase().includes(search.toLowerCase())
      )
      .filter(e => (department === "all" ? true : e.department === department))
      .filter(e => (status === "all" ? true : (e.status ?? "Active") === status));
  }, [search, department, status]);

  const uniqueDepartments = useMemo(
    () => Array.from(new Set(seedEmployees.map(e => e.department))),
    []
  );

  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-800">Employés</h1>

      <Card shadow="sm">
        <CardHeader>
          <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-3">
            <Input
              placeholder="Rechercher (nom, prénom, email)…"
              value={search}
              onValueChange={setSearch}
            />
            <Select
              selectedKeys={[department]}
              onSelectionChange={(keys) => setDepartment(Array.from(keys)[0] as string)}
              label="Département"
            >
              <SelectItem key="all">Tous</SelectItem>
              <>
                {uniqueDepartments.map((d) => (
                  <SelectItem key={d}>{d}</SelectItem>
                ))}
              </>
            </Select>
            <Select selectedKeys={[status]} onSelectionChange={(keys) => setStatus(Array.from(keys)[0] as string)} label="Statut">
              <SelectItem key="all">Tous</SelectItem>
              <SelectItem key="Active">Actif</SelectItem>
              <SelectItem key="OnLeave">En congé</SelectItem>
              <SelectItem key="Inactive">Inactif</SelectItem>
            </Select>
            <div className="flex items-end">
              <Button fullWidth variant="flat" onPress={() => { setSearch(""); setDepartment("all"); setStatus("all"); }}>
                Réinitialiser
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <EmployeeTable rows={employees} />
        </CardBody>
      </Card>
    </>
  );
}
