import { request } from "../../../config/request";
import { useMutation } from "@tanstack/react-query";

export const useDelete = () => {
  return useMutation({
    mutationKey: ["del"],
    mutationFn: (id: number) =>
      request.delete(`/category/${id}/`).then((res) => res.data),
  });
};
