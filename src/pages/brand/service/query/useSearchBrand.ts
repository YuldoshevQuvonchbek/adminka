import { request } from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";
interface CatigorySarchType {
  results: {
    id: number;
    title: string;
    image: string;
  }[];
}

export const useSearchBrand = (search: string) => {
  return useQuery({
    queryKey: ["search", search],
    queryFn: () =>
      request
        .get<CatigorySarchType>(`/brand/`, { params: { search } })
        .then((res) => res.data),
  });
};
