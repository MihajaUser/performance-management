import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/apiClient";

export interface CompetencyItem {
  category: string;
  average: number;
  comment?: string;
}

export function useEmployeeCompetenciesQuery(userId: number) {
  return useQuery<CompetencyItem[]>({
    queryKey: ["employeeCompetencies", userId],
    queryFn: async () => {
      const { data } = await api.get(`/competencies/user/${userId}`);
      return data;
    },
    enabled: !!userId,
  });
}
