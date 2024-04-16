import { request } from "../../../../config/request";
import { useMutation } from "@tanstack/react-query";

export const useDeleteBanner = () => {
  return useMutation({
    mutationKey: ["del"],
    mutationFn: (id: number) =>
      request.delete(`/banner/${id}/`).then((res) => res.data),
  });
};
