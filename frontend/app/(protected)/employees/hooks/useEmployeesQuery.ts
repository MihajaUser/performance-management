import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/apiClient";

export interface Employee {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  department: { name: string };
  jobTitle: { name: string };
  status: string;
  score?: number;
}

export function useEmployeesQuery(params?: {
  search?: string;
  department?: string;
  status?: string;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["employees", params],
    queryFn: async () => {
      const { data } = await api.get("/employees", { params });
      return data;
    },
  });
}
