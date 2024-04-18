import { useParams } from "react-router-dom";
import GetEditForm from "../../../../components/form/get-Edit/get-Edit-form";
import { useEditCatygory } from "./service/mutation/useEditCatygory";
import { Tabs, TabsProps, message } from "antd";
import { useNavigate } from "react-router-dom";
import { FildTypeCategory } from "../../../../components/form/get-Edit/get-Edit-form";
import { useGetEditCatygory } from "./service/query/useGetCatytgoryEdit";
import { Spin } from "antd";
import { useCreateAttribute } from "../subAttribute/service/mutation/useGetSubattrebuate";
import SubAttributeForm from "../../../../components/form/atribuate-form/atribuate-form";
const onChange = (key: string) => {
  console.log(key);
};
export interface imgeObject {
  file: File;
  fileList: File[];
}
interface typeAttribute {
  items: { title: string; values: [{ value: string }] }[];
}

const EditSubcatygory = () => {
  const naviget = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { mutate } = useEditCatygory(id);
  const { data: catygoryData, isLoading } = useGetEditCatygory(id as string);
  const { mutate: editAttr } = useCreateAttribute();

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

  const attributeSubmit = (data: typeAttribute) => {
    const attributes = data?.items.map((item) => {
      return {
        attribute_id: null,
        title: item.title,
        values: item?.values?.map((res) => {
          return {
            value: res?.value,
            value_id: null,
          };
        }),
      };
    });
    const forAttribute = {
      attributes,
      category_id: catygoryData?.id,
    };

    editAttr(forAttribute, {
      onSuccess: (response) => {
        console.log(response);
        naviget("/home/Subcatygory");
        message.success("Attribute successfully added!");
      },
      onError: () => {
        console.error("Error occurred while creating attribute");
        message.error("Error!");
      },
    });
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Edit Sub-Category",
      children: (
        <GetEditForm
          loading={isLoading}
          initialValues={{
            title: catygoryData?.title,
            image: catygoryData?.image,
          }}
          onFinish={onFinish}
        />
      ),
    },
    {
      key: "2",
      label: "Edit Attribute",
      children: (
        <SubAttributeForm
          atribuaterSubmit={attributeSubmit}
          initialValue={catygoryData}
        />
      ),
    },
  ];

  return (
    <>
      {isLoading ? (
        <Spin fullscreen size="large" />
      ) : (
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      )}
    </>
  );
};

export default EditSubcatygory;
