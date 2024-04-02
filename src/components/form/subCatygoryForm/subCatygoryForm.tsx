import { ArrowDownOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Image,
  Input,
  Select,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";

import React, { useState } from "react";

interface dataType {
  title: string;
  image?: {
    file: File;
  };
  parent?: {
    id: string;
    title: string;
  };
}
interface Props {
  onFinish: (values: dataType) => void;
  loading: boolean;
  initialValues?: {
    title?: string;
    image?: string | undefined;
    parent: number;
  };

  selectMapdata?: {
    value: number;
    label: JSX.Element;
  }[];
}

export interface FildTypeCategory {
  title: string;
  image?: {
    file: File;
  };
  parent?: {
    id: number;
    title: string;
  };
}

const SubCatygoryForm: React.FC<Props> = ({
  onFinish,
  initialValues,
  loading,
  selectMapdata,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  return (
    <Form
      name="wrap"
      layout="vertical"
      colon={false}
      style={{ maxWidth: 600 }}
      initialValues={initialValues}
      onFinish={onFinish}
    >
      <Form.Item
        label="Bulimni tanlang"
        name={"parent"}
        initialValue={"Bulimni tanlang"}
        rules={[{ required: true, message: "Brand tanlashni unuttingiz !!" }]}
      >
        <Select options={selectMapdata} />
      </Form.Item>
      <Form.Item
        name="title"
        label="Nomini yozing"
        rules={[{ required: true, message: "Nomlashni unuttingiz !!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="image"
        label="Rasimni joylang"
        rules={
          initialValues
            ? [{ required: false }]
            : [{ required: true, message: "Rasim joylashni unuttingiz !!" }]
        }
      >
        <Upload.Dragger
          beforeUpload={() => false}
          multiple={false}
          maxCount={1}
          listType="picture-card"
          onChange={handleChange}
          fileList={fileList}
        >
          <button style={{ border: 0, background: "none" }} type="button">
            <ArrowDownOutlined />
            <div style={{ marginTop: 8 }}>Yuklash</div>
          </button>
        </Upload.Dragger>
      </Form.Item>
      {initialValues && !fileList.length && <Image src={initialValues.image} />}
      <Form.Item>
        <Button loading={loading} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SubCatygoryForm;
