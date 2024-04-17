import { message } from "antd";
import ProductForm from "../../../components/form/product-form/product-form";
import { useNavigate } from "react-router-dom";
import { useCreateProductData } from "../service/mutation/useCreateProductData";
import { useGetSubCatygory } from "../../category/subCatygory/service/query/useGetSubCatygory";

interface productCreateDataType {
  id: number;
  parent?: {
    id: string;
    title: string;
  };
  image?: {
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
  value: string | number;
  label: JSX.Element;
}

const ProductCreate = () => {
  const navigete = useNavigate();
  const { data } = useGetSubCatygory();
  const { mutate, reset, isPending } = useCreateProductData();
  const onFinish = ({
    title,
    image,
    category,
    is_available,
    is_new,
    price,
  }: productCreateDataType) => {
    const dataform = new FormData();
    dataform.append("title", title);
    dataform.append("price", price ? String(price) : "0");
    dataform.append("is_new", is_new ? "true" : "false");
    dataform.append("is_available", is_available ? "true" : "false");
    dataform.append("category", String(category));
    if (image) dataform.append("image", image.file);

    mutate(dataform, {
      onSuccess: () => {
        message.success("Malumot qushildi");
        reset();
        navigete("/home/productList");
      },
    });
  };
  const selectMapdata = data?.data?.results.map<selectMapDataType>((item) => ({
    value: item.id,
    label: <span>{item.title}</span>,
  }));
  return (
    <>
      <ProductForm
        selectMapdata={selectMapdata}
        onFinish={onFinish}
        loading={isPending}
      />
    </>
  );
};

export default ProductCreate;
