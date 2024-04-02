import { useMutation } from "@tanstack/react-query";
import { dataType } from "../../create-catygory";
import { request } from "../../../../../config/request";
export const useGetKreateProduct = () => {
  return useMutation({
    mutationFn: (data: FormData) =>
      request
        .post<dataType>("/category/", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data),
  });
};
