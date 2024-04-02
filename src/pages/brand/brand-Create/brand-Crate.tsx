import { Tabs, TabsProps, message } from "antd";
import GetEditForm from "../../../components/form/get-Edit/get-Edit-form";
import { useNavigate } from "react-router-dom";
import { useGetCreateBrand } from "../service/mutation/useGetCreateBrand";
const onChange = (key: string) => {
  console.log(key);
};

export interface dataType {
  title: string;
  image?: {
    file: File;
  };
  parent?: number;
}

const BrandCrate = () => {
  const navigete = useNavigate();
  const { mutate, reset, isPending } = useGetCreateBrand();

  const onFinish = (values: dataType) => {
    const dataform = new FormData();
    dataform.append("title", values.title);
    if (values.image) dataform.append("image", values.image.file);
    if (values.parent) {
      dataform.append("parent", String(values.parent));
    }
    mutate(dataform, {
      onSuccess: () => {
        message.success("Brand qushildi");
        navigete("/home/brand");
        reset();
      },
    });
  };
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Catygory yaratish",
      children: <GetEditForm loading={isPending} onFinish={onFinish} />,
    },
  ];
  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
};

export default BrandCrate;
