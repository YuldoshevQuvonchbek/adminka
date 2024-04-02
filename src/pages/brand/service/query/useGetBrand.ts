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

export const useGetBrand = () => {
  return useQuery({
    queryKey: ["brand"],
    queryFn: () => request.get<brandType>("/brand/").then((res) => res.data),
  });
};
