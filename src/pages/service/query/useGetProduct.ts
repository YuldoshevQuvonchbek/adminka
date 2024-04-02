import { useQuery } from "@tanstack/react-query";
import { request } from "../../../config/request";
import { DataType } from "../../category/categoryList/service/query/useGetProduct";

export const useGetProduct = () => {
  return useQuery({
    queryKey: ["category"],
    queryFn: () => request.get<DataType>("/category/").then((res) => res.data),
  });
};
