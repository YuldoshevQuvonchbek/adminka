import { request } from "../../../../config/request";
import { useMutation } from "@tanstack/react-query";
import { BannerListdataType } from "../query/useGetBanner";
export const useEditBanner = (id: string | undefined) => {
  return useMutation({
    mutationKey: ["edit"],
    mutationFn: (data: FormData) =>
      request
        .put<BannerListdataType>(`/banner/${id}/`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data),
  });
};
