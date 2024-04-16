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
export const useGetProduct = () => {
  return useQuery({
    queryKey: ["category"],
    queryFn: () => request.get<DataType>("/category/").then((res) => res.data),
  });
};
