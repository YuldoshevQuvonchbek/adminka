import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../../config/request";

interface CatigoryList {
  id: Number;
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
export const useGetSubCatygory = () => {
  return useQuery({
    queryKey: ["subCategory"],
    queryFn: () =>
      request.get<DataType>("/api/subcategory/").then((res) => res.data),
  });
};
