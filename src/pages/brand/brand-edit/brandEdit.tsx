import { Spin, message } from "antd";
import GetEditForm, {
  FildTypeCategory,
} from "../../../components/form/get-Edit/get-Edit-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEditBrand } from "./service/mutation/useEditBrand";
import { useGetBrandEdit } from "./service/query/useGetBrandEdit";

const BandEdit = () => {
  const naviget = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { mutate, isPending } = useEditBrand(id);
  const { data, isLoading } = useGetBrandEdit(id as string);
  const onFinish = (values: FildTypeCategory) => {
    const formObject = new FormData();
    formObject.append("title", values.title);
    if (values.image?.file) {
      formObject.append("image", values.image.file);
    }
    mutate(formObject, {
      onSuccess: () => {
        message.success("Yangilandi :)");
        naviget("/home/brand");
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

export default BandEdit;
