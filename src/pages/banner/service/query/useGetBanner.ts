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
export const useGetBanner = () => {
  return useQuery({
    queryKey: ["banner"],
    queryFn: () =>
      request.get<DataTypeBanner>("/banner/").then((res) => res.data),
  });
};
