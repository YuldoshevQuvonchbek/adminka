import { request } from "../../../../../config/request";
import { useMutation } from "@tanstack/react-query";
import { DataType } from "../../../categoryList/service/query/useGetProduct";

export const useEditCatygory = (id: string | undefined) => {
  return useMutation({
    mutationKey: ["edit"],
    mutationFn: (data: FormData) =>
      request
        .put<DataType>(`/category/${id}/`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data),
  });
};
