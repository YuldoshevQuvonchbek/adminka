import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export interface BannerListdataType {
  id: number;
  title: string;
  image: string;
  description: string;
}

export interface DataTypeBanner {
  key: number;
  title: string;
  id: number;
  image: string;
  count: number;
  results: BannerListdataType[];
}
export const useGetBanner = (id: string = "id", page: number = 1) => {
  return useQuery({
    queryKey: ["banner", id, page],
    queryFn: () =>
      request
        .get<DataTypeBanner>(`/banner/?ordering=${id}`, {
          params: { offset: page, limit: 5 },
        })
        .then((res) => {
          return {
            data: res.data,
            pageSize: Math.ceil(res.data.count),
          };
        }),
  });
};
