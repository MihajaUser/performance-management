//frontend/app/(protected)/employees/hooks/useEmployeeCompetenciesQuery.ts
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/apiClient";

export interface CompetencySummary {
  id: number;
  category: string;
  averageScore: number;
  commentSummary?: string;
}

export interface CompetencyDetail {
  id: number;
  competency: string;
  category: string;
  score: number;
  comment?: string;
  evaluatorType: string;
  requiredLevel?: string | null;
}

export interface EmployeeCompetencies {
  summary: CompetencySummary[];
  details: CompetencyDetail[];
}

export function useEmployeeCompetenciesQuery(userId: number) {
  return useQuery<EmployeeCompetencies>({
    queryKey: ["employeeCompetencies", userId],
    queryFn: async () => {
      const { data } = await api.get(`/competencies/user/${userId}`);
      return data;
    },
    enabled: !!userId,
  });
}
