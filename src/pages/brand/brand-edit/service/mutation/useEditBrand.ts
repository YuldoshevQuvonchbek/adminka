import { request } from "../../../../../config/request";
import { useMutation } from "@tanstack/react-query";

export interface CatigoryList {
  id: Number;
  title: string;
  image: string;
}

export interface DataType {
  key: number;
  title: string;
  id: number;
  image: string;
  results: CatigoryList[];
}
export const useEditBrand = (id: string | undefined) => {
  return useMutation({
    mutationKey: ["edit"],
    mutationFn: (data: FormData) =>
      request
        .patch<DataType>(`/brand/${id}/`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data),
  });
};
