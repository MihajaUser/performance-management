//frontend/app/(protected)/employees/[id]/evaluations/new/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { Card, CardBody } from "@heroui/react";
import { LoadingScreen } from "@/components/LoadingScreen";
import { EmployeeHeader } from "../../../components/EmployeeHeader";
import { useEmployeeCompetenciesQuery } from "../../../hooks/useEmployeeCompetenciesQuery";
import { useEmployeeDetailQuery } from "../../../hooks/useEmployeeDetailQuery";
import { CompetencyItem } from "./components/CompetencySection";
import { EvaluationForm } from "./components/EvaluationForm";
import { KpiData } from "./components/KpiSection";

interface RawKpi {
  id: number;
  target: number;
  actual: number;
  score?: number;
  comment?: string;
  kpiTemplate: {
    name: string;
    weight?: number;
  };
}

interface RawCompetency {
  id: number;
  competency: string;
  category: string;
  requiredLevel?: string | null;
}

// --- PAGE NOUVELLE ÉVALUATION --- //
export default function NewEvaluationPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const router = useRouter();

  // ✅ Fetch employé
  const { data: employee, isLoading, isError } = useEmployeeDetailQuery(id);

  // ✅ Fetch compétences
  const { data: compData, isLoading: compLoading } =
    useEmployeeCompetenciesQuery(id);

  if (isLoading || compLoading)
    return <LoadingScreen message="Chargement du formulaire d'évaluation..." />;

  if (isError || !employee)
    return (
      <p className="text-red-500 text-sm">Erreur : employé introuvable.</p>
    );

  // === 🔹 FAKE KPI DATA (en attendant backend dédié) ===
  const fakeKpis: KpiData[] = employee.userKpis?.map((k: RawKpi) => ({
    id: k.id,
    name: k.kpiTemplate.name,
    target: k.target,
    actual: k.actual,
    score: k.score ?? 0,
    weight: k.kpiTemplate.weight ?? 25,
    comment: "",
  })) ?? [
    {
      id: 1,
      name: "Bugs corrigés / sprint",
      target: 30,
      actual: 28,
      score: 0,
      weight: 25,
      comment: "",
    },
    {
      id: 2,
      name: "Qualité du code",
      target: 85,
      actual: 88,
      score: 0,
      weight: 25,
      comment: "",
    },
    {
      id: 3,
      name: "Respect des délais",
      target: 95,
      actual: 92,
      score: 0,
      weight: 25,
      comment: "",
    },
    {
      id: 4,
      name: "Documentation technique",
      target: 10,
      actual: 9,
      score: 0,
      weight: 25,
      comment: "",
    },
  ];

  // === 🔹 FAKE COMPETENCIES DATA (à remplacer par compData.details) ===
  const fakeCompetencies: CompetencyItem[] = compData?.details?.map(
    (c: RawCompetency) => ({
      id: c.id,
      name: c.competency,
      category: c.category,
      requiredLevel:
        (c.requiredLevel as "N" | "I" | "M" | "E" | undefined) ?? undefined,
      score: 0,
      comment: "",
    })
  ) ?? [
    {
      id: 1,
      name: "Programmation JavaScript",
      category: "Techniques",
      requiredLevel: "M",
      score: 0,
      comment: "",
    },
    {
      id: 2,
      name: "Communication d'équipe",
      category: "Comportementales",
      requiredLevel: "I",
      score: 0,
      comment: "",
    },
  ];

  // === 🔹 Soumission ===
  const handleSubmit = async (data: {
    employeeId: number;
    kpis: KpiData[];
    competencies: CompetencyItem[];
    comment: string;
  }) => {
    console.log("📝 Données soumises :", data);

    try {
      // Exemple POST (à adapter selon backend)
      // await api.post("/evaluations", data);
      alert("Évaluation enregistrée avec succès !");
      router.push(`/employees/${id}`);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'enregistrement de l'évaluation.");
    }
  };

  return (
    <div className="space-y-8">
      {/* 🧩 HEADER EMPLOYÉ */}
      <EmployeeHeader
        title="Nouvelle évaluation"
        firstname={employee.firstname}
        lastname={employee.lastname}
        department={employee.department.name}
        jobTitle={employee.jobTitle.name}
        status={employee.status}
        matricule={employee.matricule}
        period="Q1-2025"
      />

      {/* 🧾 FORMULAIRE D'ÉVALUATION */}
      <Card shadow="sm" className="border border-gray-200">
        <CardBody>
          <EvaluationForm
            employeeId={id}
            kpis={fakeKpis}
            competencies={fakeCompetencies}
            onSubmit={handleSubmit}
          />
        </CardBody>
      </Card>
    </div>
  );
}
