import { message } from "antd";
import SubCatygoryForm from "../../../../components/form/subCatygoryForm/subCatygoryForm";
import { dataType } from "../../create-catygory/create-catygory";
import { useGetProduct } from "./service/mutation/useGetProduct";
import { useNavigate } from "react-router-dom";
import { useGetCatygorySub } from "./service/mutation/useGetKreateProduct";
interface selectMapDataType {
  value: number;
  label: JSX.Element;
}
const SubCatygoryCreate = () => {
  const navigete = useNavigate();
  const { data } = useGetProduct();
  const { mutate, reset, isPending } = useGetCatygorySub();
  const onFinish = (values: dataType) => {
    const dataform = new FormData();
    dataform.append("title", values.title);
    if (values.image) dataform.append("image", values.image.file);
    if (values.parent) {
      dataform.append("parent", String(values.parent));
    }

    mutate(dataform, {
      onSuccess: () => {
        message.success("Malumot qushildi");
        navigete("/home/Subcatygory");
        reset();
      },
    });
  };

  const selectMapdata = data?.results.map<selectMapDataType>((item) => ({
    value: item.id,
    label: <span>{item.title}</span>,
  }));

  return (
    <div>
      <SubCatygoryForm
        loading={isPending}
        onFinish={onFinish}
        selectMapdata={selectMapdata}
      />
    </div>
  );
};

export default SubCatygoryCreate;
