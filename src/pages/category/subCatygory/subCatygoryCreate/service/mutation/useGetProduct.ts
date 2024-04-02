import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../../../config/request";
interface CatigoryList {
  results: {
    id: number;
    title: string;
    image: string;
    parent: {
      title: string;
      id: number;
    };
  }[];
}

export const useGetProduct = () => {
  return useQuery({
    queryKey: ["category"],
    queryFn: () =>
      request.get<CatigoryList>("/category/").then((res) => res.data),
  });
};
