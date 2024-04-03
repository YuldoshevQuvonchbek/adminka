import { request } from "../../../../../../config/request";
import { useMutation } from "@tanstack/react-query";

export const useAtrebuteDelete = () => {
  return useMutation({
    mutationKey: ["del"],
    mutationFn: (id: number) =>
      request.delete(`/attribute/${id}/`).then((res) => res.data),
  });
};
