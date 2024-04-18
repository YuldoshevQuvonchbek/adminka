import { Tabs, TabsProps, message } from "antd";
import SubCatygoryForm from "../../../../components/form/subCatygoryForm/subCatygoryForm";
import { dataType } from "../../create-catygory/create-catygory";
import { useGetProduct } from "./service/mutation/useGetProduct";
import { useGetCatygorySub } from "./service/mutation/useGetKreateProduct";
import { useEffect, useState } from "react";
import SubAttributeForm from "../../../../components/form/atribuate-form/atribuate-form";
// import SubAttribute from "../subAttribute/subAttribute";
import { useCreateAttribute } from "../subAttribute/service/mutation/useGetSubattrebuate";
import { useNavigate } from "react-router-dom";
interface selectMapDataType {
  value: number;
  label: JSX.Element;
}
export interface typeAtribuate {
  items: { title: string; values: [{ value: string }] }[];
}
const onChange = (key: string) => {
  console.log(key);
};

const SubCatygoryCreate = () => {
  const navigete = useNavigate();
  const [active, setActive] = useState("1");
  const [submit, setSubmit] = useState(false);
  const [decable, setDesable] = useState(true);
  const [attributeID, setAtribuateID] = useState("");
  const { data } = useGetProduct();
  const { mutate, reset, isPending } = useGetCatygorySub();
  const { mutate: atrebuateMutate } = useCreateAttribute();
  const onFinish = (values: dataType) => {
    const dataform = new FormData();
    dataform.append("title", values.title);
    if (values.image) dataform.append("image", values.image.file);
    if (values.parent) {
      dataform.append("parent", String(values.parent));
    }

    mutate(dataform, {
      onSuccess: (res) => {
        message.success("SubCatygory qushildi");
        setSubmit(true);
        setAtribuateID(String(res.data?.id));
        reset();
      },
    });
  };
  const AtribuaterSubmit = (data: typeAtribuate) => {
    const attributes = data?.items?.map((item) => {
      return {
        attribute_id: null,
        title: item.title,
        values: item.values.map((res) => {
          return {
            value: res.value,
            value_id: null,
          };
        }),
      };
    });
    const formAtribute = { attributes, category_id: attributeID };
    atrebuateMutate(formAtribute, {
      onSuccess: (response) => {
        message.success("Attribut qushildi");
        navigete("/home/Subcatygory");
        console.log(response);
      },
    });
  };

  const selectMapdata = data?.results?.map<selectMapDataType>((item) => ({
    value: item.id,
    label: <span>{item.title}</span>,
  }));
  console.log(selectMapdata);

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
      children: <SubAttributeForm atribuaterSubmit={AtribuaterSubmit} />,
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
