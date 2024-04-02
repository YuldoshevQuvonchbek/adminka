import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../../config/request";

interface type {
  title: string;
  image?: string;
}
export const useGetEditCatygory = (id: string) => {
  return useQuery({
    queryKey: ["dataEdit", id],
    queryFn: () =>
      request.get<type>(`/category/${id}/`).then((res) => res.data),
  });
};
