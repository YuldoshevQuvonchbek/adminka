import { Spin, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../../../components/form/product-form/product-form";
import { useEditProduct } from "../service/mutation/useEditProduct";
import { useProductEditData } from "../service/query/useProductEditData";
import { useGetSubCatygory } from "../../category/subCatygory/service/query/useGetSubCatygory";

export interface imgeObject {
  file: File;
  fileList: File[];
}
interface editProduktDataType {
  id: number;
  image: {
    file: File;
    fileList: FileList;
  };
  title: string;
  price: number;
  is_available: boolean;
  category: {
    id: number;
    name: string;
  };
  is_new: boolean;
}
interface selectMapDataType {
  value: number | string;
  label: JSX.Element;
}

const EditProduct = () => {
  const naviget = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { mutate } = useEditProduct(id);
  const { data, isLoading } = useProductEditData(id as string);
  const { data: SUBdata } = useGetSubCatygory();

  const onFinish = (values: editProduktDataType) => {
    const formObject = new FormData();
    formObject.append("title", values.title);
    if (values.image?.file) {
      formObject.append("image", values.image.file);
    }
    formObject.append("price", String(values.price));
    formObject.append("is_new", String(values.is_new));
    formObject.append("is_available", String(values.is_available));
    formObject.append("category", String(values.category));
    mutate(formObject, {
      onSuccess: () => {
        message.success("Yangilandi :)");
        naviget("/home/productList");
      },
      onError: () => {
        message.error("Hatolik :(");
      },
    });
  };

  const selectMapdata = SUBdata?.data.results.map<selectMapDataType>(
    (item) => ({
      value: item.id,
      label: <span>{item.title}</span>,
    })
  );
  return (
    <>
      {isLoading ? (
        <Spin fullscreen size="large" />
      ) : (
        <ProductForm
          selectMapdata={selectMapdata}
          loading={isLoading}
          initialValues={{
            title: data?.title,
            price: data?.price,
            is_new: data?.is_new,
            is_available: data?.is_available,
            image: data?.image,
          }}
          onFinish={onFinish}
        />
      )}
    </>
  );
};

export default EditProduct;
