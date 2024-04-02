import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { message } from "antd";
import { useGetKreateProduct } from "./service/mutation/useGetKreateProduct";
import GetEditForm from "../../../components/form/get-Edit/get-Edit-form";
import SubCatygoryCreate from "../subCatygory/subCatygoryCreate/subCatygoryCreate";

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
}

const CreateCategory: React.FC = () => {
  const [active, setActive] = useState("1");
  const [submit, setSubmit] = useState(false);
  const [decable, setDesable] = useState(true);

  const { mutate, reset, isPending } = useGetKreateProduct();

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
        reset();
        setSubmit(true);
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
      children: <SubCatygoryCreate />,
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
