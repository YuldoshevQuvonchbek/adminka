import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../../config/request";

interface CatigoryList {
  id: number;
  title: string;
  image: string;
}

export interface DataType {
  key: number;
  title: string;
  id: number;
  image: string;
  count: number;
  results: CatigoryList[];
}

export const useGetProduct = (id: string = "id", page: number = 1) => {
  return useQuery({
    queryKey: ["category", id, page],
    queryFn: () =>
      request
        .get<DataType>(`/category/?ordering=${id}`, {
          params: { offset: page, limit: 5 },
        })
        .then((res) => {
          return {
            Catygorydata: res.data,
            pageSize: Math.ceil(res.data.count),
          };
        }),
  });
};
