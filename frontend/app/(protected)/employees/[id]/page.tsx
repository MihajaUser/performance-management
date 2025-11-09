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
import { EmployeeHeader } from "../components/EmployeeHeader";
import { useEffect, useState, useMemo } from "react";
import { EvaluationTimeline } from "../components/EmployeeTimeline";

interface EvaluationData {
  id: number;
  period: string;
  general_score: number;
  sentiment: string;
  training_recommendations?: { title: string; url: string }[];
  created_at: string;
}

interface KpiData {
  id: number;
  kpiTemplate: { name: string; weight: number };
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

  const [selectedEvaluationId, setSelectedEvaluationId] = useState<number | null>(null);

  const { data, isLoading, isError } = useEmployeeDetailQuery(id);
  const { data: compData, isLoading: compLoading } =
    useEmployeeCompetenciesQuery(id, selectedEvaluationId);

  const getMostRecentEvaluationId = (
    evaluations?: Pick<EvaluationData, "id" | "created_at">[]
  ): number | null => {
    if (!evaluations?.length) return null;
    const sorted = [...evaluations].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    return sorted[0].id;
  };


  useEffect(() => {
    if (data?.evaluationsReceived?.length && !selectedEvaluationId) {
      const recentId = getMostRecentEvaluationId(data.evaluationsReceived);
      if (recentId) {
        const frame = requestAnimationFrame(() => setSelectedEvaluationId(recentId));
        return () => cancelAnimationFrame(frame);
      }
    }
  }, [data?.evaluationsReceived, selectedEvaluationId]);


  const evaluations: EvaluationItem[] = useMemo(() => {
    if (!data) return [];
    return data.evaluationsReceived.map((e: EvaluationData) => ({
      id: e.id,
      period: e.period,
      score: e.general_score,
      sentiment: e.sentiment,
      trainingRecommendations: e.training_recommendations ?? [],
      createdAt: e.created_at,
    }));
  }, [data]);

  const kpis: KpiItem[] = useMemo(() => {
    if (!data) return [];
    return data.userKpis.map((k: KpiData) => ({
      id: k.id,
      name: k.kpiTemplate.name,
      target: k.target,
      actual: k.actual,
      score: k.score,
      weight: k.kpiTemplate.weight,
      comment: k.comment,
    }));
  }, [data]);

  const performance = useMemo(() => {
    if (!data) return [];
    return data.performanceScores.map((p: PerformanceData) => ({
      period: p.period,
      score: p.score_final,
      predicted: p.predicted_score,
    }));
  }, [data]);

  const selectedEvaluation = useMemo(() => {
    return data?.evaluationsReceived?.find(
      (e: EvaluationData) => e.id === selectedEvaluationId
    );
  }, [data, selectedEvaluationId]);

  const filteredEvaluations = useMemo(() => {
    if (!selectedEvaluation) return evaluations;
    return evaluations.filter((e) => e.period === selectedEvaluation.period);
  }, [evaluations, selectedEvaluation]);

  const filteredPerformance = useMemo(() => {
    if (!selectedEvaluation) return performance;
    return performance.filter((p: PerformanceData) => p.period === selectedEvaluation.period);
  }, [performance, selectedEvaluation]);

  const weakestKpi = useMemo(() => {
    if (!kpis.length) return null;
    return [...kpis].sort((a, b) => a.score - b.score)[0].name;
  }, [kpis]);


  if (isLoading || compLoading)
    return <LoadingScreen message="Chargement des informations de l'employé..." />;
  if (isError || !data || !compData)
    return <p className="text-red-500 text-sm">Erreur : employé introuvable.</p>;

  /* -------------------- Affichage principal -------------------- */
  const employee: Employee = {
    id: data.id,
    firstname: data.firstname,
    lastname: data.lastname,
    department: data.department.name,
    jobTitle: data.jobTitle.name,
    status: data.status,
    matricule: data.matricule,
  };

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

      <EvaluationTimeline
        evaluations={data.evaluationsReceived}
        selectedId={selectedEvaluationId}
        onSelect={(id) => setSelectedEvaluationId(id)}
      />

      <Card shadow="sm" className="border border-gray-200">
        <CardHeader className="border-b border-gray-200 bg-gray-50" />
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
                items={filteredEvaluations}
                performance={filteredPerformance}
                weakestKpi={weakestKpi}
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
