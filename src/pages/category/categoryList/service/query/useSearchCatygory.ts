import { request } from "../../../../../config/request";
import { useQuery } from "@tanstack/react-query";

interface CatigorySarchType {
  results: {
    id: number;
    title: string;
    image: string;
  }[];
}

export const useSearchCatygory = (search: string) => {
  return useQuery({
    queryKey: ["search", search],
    queryFn: () =>
      request
        .get<CatigorySarchType>(`/category/`, { params: { search } })
        .then((res) => res.data),
  });
};
