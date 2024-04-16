import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../../../config/request";

export interface DataTypeAtrebute {
  count: string;
  id: number;
  previous: boolean;
  results: {
    id: number;
    title: string;
    category: {}[];
  }[];
}

export const useGetAtrebute = () => {
  return useQuery({
    queryKey: ["attribute"],
    queryFn: () =>
      request.get<DataTypeAtrebute>("/attribute/").then((res) => res.data),
  });
};
