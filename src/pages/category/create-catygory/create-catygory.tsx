import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { message } from "antd";
import { useGetKreateProduct } from "./service/mutation/useGetKreateProduct";
import GetEditForm from "../../../components/form/get-Edit/get-Edit-form";
import { useNavigate } from "react-router-dom";
const onChange = (key: string) => {
  console.log(key);
};

export interface dataType {
  title: string;
  image?: {
    file: File;
  };
  parent?: {
    id: string;
    title: string;
  };
  data?: {
    id: string;
    title: string;
    image?: string;
    parent?: number;
  };
}

const CreateCategory: React.FC = () => {
  const naviget = useNavigate();
  const [subIdState, setsubIdState] = useState("");
  const [active, setActive] = useState("1");
  const [submit, setSubmit] = useState(false);
  const [decable, setDesable] = useState(true);

  const { mutate, reset, isPending } = useGetKreateProduct();

  const onFinish = (values: dataType) => {
    const dataform = new FormData();
    dataform.append("title", values.title);
    if (values.image) dataform.append("image", values.image.file);
    if (values.parent) {
      dataform.append("parent", "");
    }
    mutate(dataform, {
      onSuccess: (res) => {
        message.success("Malumot qushildi");
        reset();
        setSubmit(true);
        setsubIdState(String(res));
      },
    });
  };

  const onFinishSub = (values: dataType) => {
    const dataform = new FormData();
    dataform.append("title", values.title);
    dataform.append("parent", subIdState);
    if (values.image) dataform.append("image", values.image.file);

    mutate(dataform, {
      onSuccess: () => {
        message.success("Malumot qushildi");
        naviget("/home/catygoryList");
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
    {
      key: "2",
      label: "Sub catygory yaratish",
      children: <GetEditForm loading={isPending} onFinish={onFinishSub} />,
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
    <>
      <Tabs activeKey={active} items={items} onChange={onChange} />
    </>
  );
};

export default CreateCategory;
