import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export interface productDataType {
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

export const useGetProductData = () => {
  return useQuery({
    queryKey: ["product"],
    queryFn: () =>
      request.get<productDataType>("/product/").then((res) => res.data),
  });
};
