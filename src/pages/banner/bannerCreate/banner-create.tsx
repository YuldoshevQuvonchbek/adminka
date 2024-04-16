import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetCreateBanner } from "../service/mutation/useGetCreateBanner";
import BannerForm from "../../../components/form/banner-form/banner-form";

export interface dataTypeBanner {
  title: string;
  image?: {
    file: File;
  };
  description: string;
}

const BannerCreate = () => {
  const navigete = useNavigate();
  const { mutate, reset, isPending } = useGetCreateBanner();

  const onFinish = (values: dataTypeBanner) => {
    const dataform = new FormData();
    dataform.append("title", values.title);
    if (values.image) dataform.append("image", values.image.file);

    mutate(dataform, {
      onSuccess: () => {
        message.success("Banner qushildi");
        navigete("/home/bannerList");
        reset();
      },
    });
  };

  return (
    <div>
      <BannerForm loading={isPending} onFinish={onFinish} />
    </div>
  );
};

export default BannerCreate;
