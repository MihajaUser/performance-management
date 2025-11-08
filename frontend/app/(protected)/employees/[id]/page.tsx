//frontend/app/(protected)/employees/[id]/page.tsx
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
import { EmployeeCompetenciesTable } from "../components/EmployeeCompetenciesTable";
import { EmployeeCompetenciesChart } from "../components/EmployeeCompetenciesChart";
import { LoadingScreen } from "@/components/LoadingScreen";
import { EmployeeHeader } from "../components/EmployeeHeader"; // ✅ nouveau composant

interface EvaluationData {
  id: string | number;
  period: string;
  general_score: number;
  sentiment: string;
  training_recommendations?: {
    title: string;
    url: string;
  }[];
}


interface KpiData {
  id: string | number;
  kpiTemplate: {
    name: string;
    weight: number;
  };
  target: number;
  actual: number;
  score: number;
  comment: string;
}

interface PerformanceData {
  period: string;
  score_final: number;
  predicted_score: number;
}

export default function EmployeeDetailPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  const { data, isLoading, isError } = useEmployeeDetailQuery(id);
  const { data: compData, isLoading: compLoading } =
    useEmployeeCompetenciesQuery(id);

  if (isLoading || compLoading)
    return (
      <LoadingScreen message="Chargement des informations de l'employé..." />
    );
  if (isError || !data || !compData)
    return (
      <p className="text-red-500 text-sm">Erreur : employé introuvable.</p>
    );
console.log("Données employé :", data);
  const employee: Employee = {
    id: data.id,
    firstname: data.firstname,
    lastname: data.lastname,
    department: data.department.name,
    jobTitle: data.jobTitle.name,
    status: data.status,
    matricule: data.matricule,
  };

  const evaluations: EvaluationItem[] = data.evaluationsReceived.map(
    (e: EvaluationData) => ({
      id: e.id,
      period: e.period,
      score: e.general_score,
      sentiment: e.sentiment,
      trainingRecommendations: e.training_recommendations ?? [],
    })
  );


  const kpis: KpiItem[] = data.userKpis.map((k: KpiData) => ({
    id: k.id,
    name: k.kpiTemplate.name,
    target: k.target,
    actual: k.actual,
    score: k.score,
    weight: k.kpiTemplate.weight,
    comment: k.comment,
  }));

  const performance = data.performanceScores.map((p: PerformanceData) => ({
    period: p.period,
    score: p.score_final,
    predicted: p.predicted_score,
  }));

  return (
    <div className="space-y-8">
      <EmployeeHeader
        title="Fiche employé"
        firstname={employee.firstname}
        lastname={employee.lastname}
        department={employee.department}
        jobTitle={employee.jobTitle}
        status={employee.status}
        matricule={employee.matricule?.toString()}
      />

      {/* FICHE AVEC TABS */}
      <Card shadow="sm" className="border border-gray-200">
        <CardHeader className="border-b border-gray-200 bg-gray-50">
          {/* <h2 className="text-lg font-semibold text-gray-800">Fiche employé</h2> */}
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
              <EmployeeEvaluations
                items={evaluations}
                performance={performance}
              />
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
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
