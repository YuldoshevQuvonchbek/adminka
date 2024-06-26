import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../../config/request";

interface type {
  title: string;
  image?: string;
}
export const useGetBrandEdit = (id: string) => {
  return useQuery({
    queryKey: ["dataEdit", id],
    queryFn: () => request.get<type>(`/brand/${id}/`).then((res) => res.data),
  });
};
