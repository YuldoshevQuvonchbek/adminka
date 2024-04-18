import { AtribuateType } from "../../../../../../components/form/atribuate-form/atribuate-form";
import { request } from "../../../../../../config/request";
import { useMutation } from "@tanstack/react-query";

export const useCreateAttribute = () => {
  return useMutation({
    mutationKey: ["data"],
    mutationFn: (data: AtribuateType) =>
      request.patch(`/api/category_edit/`, data).then((res) => res.data),
  });
};
