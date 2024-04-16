import { Spin, message } from "antd";
import GetEditForm, {
  FildTypeCategory,
} from "../../../components/form/get-Edit/get-Edit-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEditBanner } from "../service/mutation/useEditBanner";
import { useGetBannerEdit } from "../service/query/useGetBannerEdit";

const BannerEdit = () => {
  const naviget = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { mutate, isPending } = useEditBanner(id);
  const { data, isLoading } = useGetBannerEdit(id as string);
  const onFinish = (values: FildTypeCategory) => {
    const formObject = new FormData();
    formObject.append("title", values.title);
    if (values.image?.file) {
      formObject.append("image", values.image.file);
    }
    mutate(formObject, {
      onSuccess: () => {
        message.success("Banner Yangilandi :)");
        naviget("/home/bannerList");
      },
      onError: () => {
        message.error("Hatolik :(");
      },
    });
  };
  return (
    <>
      {isLoading ? (
        <Spin fullscreen size="large" />
      ) : (
        <GetEditForm
          loading={isPending}
          initialValues={{ title: data?.title, image: data?.image }}
          onFinish={onFinish}
        />
      )}
    </>
  );
};

export default BannerEdit;
