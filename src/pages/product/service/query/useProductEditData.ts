import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

interface type {
  title: string;
  image?: string;
  price: number;
  is_available: boolean;
  is_new: boolean;
}
export const useProductEditData = (id: string) => {
  return useQuery({
    queryKey: ["dataEdit", id],
    queryFn: () => request.get<type>(`/product/${id}/`).then((res) => res.data),
  });
};
