import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../../../config/request";
import { dataType } from "../../../../create-catygory/create-catygory";
export const useGetCatygorySub = () => {
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
