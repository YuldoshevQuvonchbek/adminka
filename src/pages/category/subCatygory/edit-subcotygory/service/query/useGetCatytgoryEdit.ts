import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../../../config/request";

interface type {
  id: number;
  title: string;
  image?: string;
  parent?: {
    id: number;
    title: string;
  };
  children: null;
  attributes: {
    id: number;
    title: string;
    values: [
      {
        id: number;
        value: string;
      }
    ];
  }[];
}
export const useGetEditCatygory = (id: string) => {
  return useQuery({
    queryKey: ["dataEdit", id],
    queryFn: () =>
      request.get<type>(`/category/${id}/`).then((res) => res.data),
  });
};
