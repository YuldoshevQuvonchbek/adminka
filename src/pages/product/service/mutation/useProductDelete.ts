import { request } from "../../../../config/request";
import { useMutation } from "@tanstack/react-query";

export const useProductDelete = () => {
  return useMutation({
    mutationKey: ["del"],
    mutationFn: (id: number) =>
      request.delete(`/product/${id}/`).then((res) => res.data),
  });
};
