import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
export interface brandGetType {
  id: number;
  title: string;
  image: string;
}

export const useGetCreateBanner = () => {
  return useMutation({
    mutationFn: (data: FormData) =>
      request
        .post<brandGetType>("/banner/", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data),
  });
};
