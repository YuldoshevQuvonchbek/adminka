import { Tabs, TabsProps, message } from "antd";
import SubCatygoryForm from "../../../../components/form/subCatygoryForm/subCatygoryForm";
import { dataType } from "../../create-catygory/create-catygory";
import { useGetProduct } from "./service/mutation/useGetProduct";
import { useGetCatygorySub } from "./service/mutation/useGetKreateProduct";
import { useEffect, useState } from "react";
import SubAttribute from "../subAttribute/subAttribute";
interface selectMapDataType {
  value: number;
  label: JSX.Element;
}
const onChange = (key: string) => {
  console.log(key);
};

const SubCatygoryCreate = () => {
  const [active, setActive] = useState("1");
  const [submit, setSubmit] = useState(false);
  const [decable, setDesable] = useState(true);

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
        setSubmit(true);
        reset();
      },
    });
  };

  const selectMapdata = data?.results.map<selectMapDataType>((item) => ({
    value: item.id,
    label: <span>{item.title}</span>,
  }));

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Catygory yaratish",
      children: (
        <SubCatygoryForm
          loading={isPending}
          onFinish={onFinish}
          selectMapdata={selectMapdata}
        />
      ),
    },
    {
      key: "2",
      label: "Attribuate yaratish",
      children: <SubAttribute />,
      disabled: decable,
    },
  ];
  useEffect(() => {
    if (submit) {
      setActive("2");
      setDesable(false);
    }
  }, [submit]);

  return (
    <div>
      <Tabs activeKey={active} items={items} onChange={onChange} />
    </div>
  );
};

export default SubCatygoryCreate;
