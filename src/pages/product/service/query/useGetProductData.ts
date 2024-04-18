import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export interface productDataType {
  count: number;
  results: {
    id: number;
    image: string;
    title: string;
    price: number;
    is_available: boolean;

    category: {
      id: number;
      name: string;
    };
    is_new: boolean;
  }[];
}

export const useGetProductData = (id: string = "id", page: number = 1) => {
  return useQuery({
    queryKey: ["product", id, page],
    queryFn: () =>
      request
        .get<productDataType>(`/product/?ordering=${id}`, {
          params: { offset: page, limit: 5 },
        })
        .then((res) => {
          return {
            data: res?.data,
            pageSize: Math.ceil(res.data.count),
          };
        }),
  });
};
