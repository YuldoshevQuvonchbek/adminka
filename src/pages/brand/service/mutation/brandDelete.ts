import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useDeleteBrand = () => {
  return useMutation({
    mutationKey: ["deleteBrand"],
    mutationFn: (id: number) =>
      request.delete(`/brand/${id}/`).then((res) => res.data),
  });
};
