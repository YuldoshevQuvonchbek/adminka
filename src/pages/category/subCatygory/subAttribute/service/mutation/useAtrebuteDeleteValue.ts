import { request } from "../../../../../../config/request";
import { useMutation } from "@tanstack/react-query";

export const useAtrebuteDeleteValue = () => {
  return useMutation({
    mutationKey: ["del"],
    mutationFn: (id: number) =>
      request.delete(`/attribute-value/${id}/`).then((res) => res.data),
  });
};
