import { request } from "../../../../config/request";
import { useMutation } from "@tanstack/react-query";
import { productDataType } from "../query/useGetProductData";

export const useEditProduct = (id: string | undefined) => {
  return useMutation({
    mutationKey: ["edit"],
    mutationFn: (data: FormData) =>
      request
        .put<productDataType>(`/product/${id}/`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data),
  });
};
