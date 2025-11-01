"use client"

import { useParams } from "next/navigation"
import { Card, CardBody, CardHeader, Tabs, Tab } from "@heroui/react"
import { useEmployeeDetailQuery } from "../hooks/useEmployeeDetailQuery"
import { EmployeeInfo } from "../components/EmployeeInfo"
import { EmployeeEvaluations } from "../components/EmployeeEvaluations"
import { EmployeeKpis } from "../components/EmployeeKpis"
import { EmployeeCompetencies } from "../components/EmployeeCompetencies"
import { EmployeePerformance } from "../components/EmployeePerformance"

export default function EmployeeDetailPage() {
  const params = useParams<{ id: string }>()
  const id = Number(params.id)
  const { data, isLoading, isError } = useEmployeeDetailQuery(id)

  if (isLoading) return <p className="text-gray-500">Chargement…</p>
  if (isError || !data) return <p className="text-red-500">Erreur : employé introuvable.</p>

  const { employee, evaluations, kpis, competencies, performance } = data

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
              <EmployeeEvaluations items={evaluations} />
            </Tab>
            <Tab key="kpi" title="KPI">
              <EmployeeKpis items={kpis} />
            </Tab>
            <Tab key="competences" title="Compétences">
              <EmployeeCompetencies items={competencies} />
            </Tab>
            <Tab key="performance" title="Score global">
              <EmployeePerformance points={performance} />
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </>
  )
}
