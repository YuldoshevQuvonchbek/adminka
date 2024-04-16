import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { DataTypeBanner } from "./useGetBanner";

export const useGetBannerEdit = (id: string) => {
  return useQuery({
    queryKey: ["dataEdit", id],
    queryFn: () =>
      request.get<DataTypeBanner>(`/banner/${id}/`).then((res) => res.data),
  });
};
