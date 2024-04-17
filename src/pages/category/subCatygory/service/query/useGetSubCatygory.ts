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
export const useGetSubCatygory = (id: string = "id", page: number = 1) => {
  return useQuery({
    queryKey: ["subCategory", id, page],
    queryFn: () =>
      request
        .get<DataType>(`/api/subcategory/?ordering=${id}`, {
          params: { offset: page, limit: 5 },
        })
        .then((res) => {
          return {
            data: res.data,
            pageSize: Math.ceil(res.data.count),
          };
        }),
  });
};
