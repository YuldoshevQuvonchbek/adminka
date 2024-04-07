import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
interface CreateProductdataType {
  id: number;
  image: string;
  title: string;
  price: number;
  is_available: boolean;
  category:
    | {
        id: number;
        name: string;
      }
    | any;
  is_new: boolean;
}
export const useCreateProductData = () => {
  return useMutation({
    mutationFn: (data: FormData) =>
      request
        .post<CreateProductdataType>("/product/", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data),
  });
};
