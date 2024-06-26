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

  const onFinish = ({ title, image }: dataType) => {
    const dataform = new FormData();
    dataform.append("title", title);
    if (image) dataform.append("image", image.file);
    if (parent) dataform.append("parent", "");

    mutate(dataform, {
      onSuccess: (res) => {
        message.success("Malumot qushildi");
        reset();
        setSubmit(true);
        setsubIdState(String(res.data?.id));
      },
    });
  };

  const onFinishSub = (values: dataType) => {
    const dataformSub = new FormData();
    dataformSub.append("title", values.title);
    dataformSub.append("parent", subIdState);
    if (values.image) dataformSub.append("image", values.image.file);

    mutate(dataformSub, {
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
