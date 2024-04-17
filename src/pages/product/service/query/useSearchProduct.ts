import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";
interface CatigorySarchType {
  results: {
    id: number;
    title: string;
    image: string;
  }[];
}

export const useSearchProduct = (search: string) => {
  return useQuery({
    queryKey: ["search", search],
    queryFn: () =>
      request
        .get<CatigorySarchType>(`/product/`, { params: { search } })
        .then((res) => res.data),
  });
};
