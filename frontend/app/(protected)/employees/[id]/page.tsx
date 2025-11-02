"use client";

import { useParams } from "next/navigation";
import { Card, CardBody, CardHeader, Tabs, Tab } from "@heroui/react";
import { useEmployeeDetailQuery } from "../hooks/useEmployeeDetailQuery";
import { useEmployeeCompetenciesQuery } from "../hooks/useEmployeeCompetenciesQuery";
import { Employee } from "../components/EmployeeInfo";
import {
  EmployeeEvaluations,
  type EvaluationItem,
} from "../components/EmployeeEvaluations";
import { EmployeeKpis, type KpiItem } from "../components/EmployeeKpis";
import { EmployeePerformance } from "../components/EmployeePerformance";
import { EmployeeCompetenciesTable } from "../components/EmployeeCompetenciesTable";
import { EmployeeCompetenciesChart } from "../components/EmployeeCompetenciesChart";

export default function EmployeeDetailPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  const { data, isLoading, isError } = useEmployeeDetailQuery(id);
  const { data: compData, isLoading: compLoading } =
    useEmployeeCompetenciesQuery(id);

  if (isLoading || compLoading)
    return <p className="text-gray-500 text-sm">Chargement…</p>;
  if (isError || !data || !compData)
    return (
      <p className="text-red-500 text-sm">Erreur : employé introuvable.</p>
    );

  const employee: Employee = {
    id: data.id,
    firstname: data.firstname,
    lastname: data.lastname,
    department: data.department.name,
    jobTitle: data.jobTitle.name,
    status: data.status,
    score: data.score,
  };

  const evaluations: EvaluationItem[] = data.evaluationsReceived.map((e) => ({
    id: e.id,
    period: e.period,
    score: e.general_score,
    sentiment: e.sentiment,
  }));

  const kpis: KpiItem[] = data.userKpis.map((k) => ({
    id: k.id,
    name: k.kpiTemplate.name,
    target: k.target,
    actual: k.actual,
  }));

  const performance = data.performanceScores.map((p) => ({
    period: p.period,
    score: p.score_final,
    predicted: p.predicted_score,
  }));

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold text-gray-900">
          {employee.firstname} {employee.lastname}
        </h1>
        <p className="text-sm text-gray-600">
          {employee.jobTitle} — {employee.department}
        </p>
      </div>

      {/* PROFIL */}
      <Card shadow="sm" className="border border-gray-200">
        <CardBody className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div>
            <p className="text-gray-500">Nom</p>
            <p className="font-medium text-gray-800">
              {employee.firstname} {employee.lastname}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Département</p>
            <p className="font-medium text-[#002B5B]">{employee.department}</p>
          </div>
          <div>
            <p className="text-gray-500">Poste</p>
            <p className="font-medium text-[#002B5B]">{employee.jobTitle}</p>
          </div>
          <div>
            <p className="text-gray-500">Statut</p>
            <span
              className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                employee.status === "active"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {employee.status ?? "—"}
            </span>
          </div>
          <div>
            <p className="text-gray-500">Score global</p>
            <p className="font-semibold text-gray-800">
              {typeof employee.score === "number"
                ? employee.score.toFixed(2)
                : "—"}
            </p>
          </div>
        </CardBody>
      </Card>

      {/* FICHE AVEC TABS */}
      <Card shadow="sm" className="border border-gray-200">
        <CardHeader className="border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-800">Fiche employé</h2>
        </CardHeader>
        <CardBody className="pt-0">
          <Tabs
            aria-label="Onglets fiche employé"
            color="primary"
            variant="underlined"
            classNames={{
              tabList:
                "grid grid-cols-4 border-b border-gray-200 bg-white rounded-t-md overflow-hidden",
              tab: [
                "flex items-center justify-center px-4 py-3 text-sm font-medium text-gray-600 transition-all relative",
                "hover:bg-gray-50 hover:text-gray-900",
                "data-[selected=true]:text-[#002B5B] data-[selected=true]:font-semibold",
                "after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-transparent",
                "data-[selected=true]:after:bg-[#002B5B]",
                "border-r border-gray-200 last:border-r-0",
              ].join(" "),
              panel: "pt-6 bg-gray-50 rounded-b-md",
            }}
          >
            <Tab key="evaluations" title="Évaluations">
              <EmployeeEvaluations items={evaluations} />
            </Tab>
            <Tab key="kpi" title="KPI">
              <EmployeeKpis items={kpis} />
            </Tab>

            <Tab key="competences-details" title="Compétences">
              <EmployeeCompetenciesTable details={compData.details} />
            </Tab>

            <Tab key="competences-summary" title="Synthèse catégories">
              <EmployeeCompetenciesChart summary={compData.summary} />
            </Tab>

            <Tab key="performance" title="Score global">
              <EmployeePerformance points={performance} />
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
