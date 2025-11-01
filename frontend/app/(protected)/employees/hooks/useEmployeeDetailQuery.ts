import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/apiClient";

export function useEmployeeDetailQuery(id: number) {
  return useQuery({
    queryKey: ["employee", id],
    queryFn: async () => {
      const { data } = await api.get(`/employees/${id}`);
      return data;
    },
    enabled: !!id,
  });
}
