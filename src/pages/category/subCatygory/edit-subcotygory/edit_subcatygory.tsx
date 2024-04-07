import { useParams } from "react-router-dom";
import GetEditForm from "../../../../components/form/get-Edit/get-Edit-form";
import { useEditCatygory } from "./service/mutation/useEditCatygory";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { FildTypeCategory } from "../../../../components/form/get-Edit/get-Edit-form";
import { useGetEditCatygory } from "./service/query/useGetCatytgoryEdit";
import { Spin } from "antd";

export interface imgeObject {
  file: File;
  fileList: File[];
}

const EditSubcatygory = () => {
  const naviget = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { mutate } = useEditCatygory(id);
  const { data, isLoading } = useGetEditCatygory(id as string);

  const onFinish = (values: FildTypeCategory) => {
    const formObject = new FormData();
    formObject.append("title", values.title);
    if (values.image?.file) {
      formObject.append("image", values.image.file);
    }
    mutate(formObject, {
      onSuccess: () => {
        message.success("Yangilandi :)");
        naviget("/home/Subcatygory");
      },
      onError: () => {
        message.error("Hatolik :(");
      },
    });
  };

  return (
    <>
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <GetEditForm
          loading={isLoading}
          initialValues={{ title: data?.title, image: data?.image }}
          onFinish={onFinish}
        />
      )}
    </>
  );
};

export default EditSubcatygory;
