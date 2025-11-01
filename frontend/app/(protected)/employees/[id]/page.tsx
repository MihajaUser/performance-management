"use client";

import { Card, CardHeader, CardBody, Tabs, Tab } from "@heroui/react";
import { useMemo } from "react";
import { useParams } from "next/navigation";
import { employees, evaluations, kpis, competencies, performance } from "../data/mockEmployees";
import { EmployeeInfo } from "../components/EmployeeInfo";
import { EmployeeEvaluations } from "../components/EmployeeEvaluations";
import { EmployeeKpis } from "../components/EmployeeKpis";
import { EmployeeCompetencies } from "../components/EmployeeCompetencies";
import { EmployeePerformance } from "../components/EmployeePerformance";

export default function EmployeeDetailPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  const employee = useMemo(() => employees.find((e) => e.id === id), [id]);
  const employeeEvaluations = evaluations;   // mock pour l’instant
  const employeeKpis = kpis;                 // mock
  const employeeCompetencies = competencies; // mock
  const employeePerformance = performance;   // mock

  if (!employee) {
    return <p className="text-gray-600">Employé introuvable.</p>;
    }

  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-800">
        {employee.firstname} {employee.lastname}
      </h1>

      <Card shadow="sm" className="mb-4">
        <CardBody>
          <EmployeeInfo employee={employee} />
        </CardBody>
      </Card>

      <Card shadow="sm">
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-700">Fiche employé</h2>
        </CardHeader>
        <CardBody>
          <Tabs aria-label="Onglets fiche employé" color="primary" variant="underlined">
            <Tab key="profil" title="Profil">
              <EmployeeInfo employee={employee} />
            </Tab>
            <Tab key="evaluations" title="Évaluations">
              <EmployeeEvaluations items={employeeEvaluations} />
            </Tab>
            <Tab key="kpi" title="KPI">
              <EmployeeKpis items={employeeKpis} />
            </Tab>
            <Tab key="competences" title="Compétences">
              <EmployeeCompetencies items={employeeCompetencies} />
            </Tab>
            <Tab key="performance" title="Score global">
              <EmployeePerformance points={employeePerformance} />
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </>
  );
}
