import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";
interface brandType {
  id: number;
  title: string;
  image: string;
  count: number;
  results: [
    {
      id: number;
      title: string;
      image: string;
    }
  ];
}

export const useGetBrand = (id: string = "id", page: number = 1) => {
  return useQuery({
    queryKey: ["brand", id, page],
    queryFn: () =>
      request
        .get<brandType>(`/brand/?ordering=${id}`, {
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
