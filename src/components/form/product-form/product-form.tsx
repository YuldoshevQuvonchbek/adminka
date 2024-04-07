import React, { useState } from "react";
import {
  Button,
  Form,
  Image,
  Input,
  Select,
  Space,
  Switch,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { ArrowDownOutlined } from "@ant-design/icons";

interface Props {
  onFinish: (values: FildTypeProduct) => void;
  loading: boolean;
  initialValues?: {
    id?: number;
    title?: string;
    image?: string | undefined;
    price?: number | undefined;
    is_available?: boolean | undefined;
    category?: number | undefined;
    is_new?: boolean | undefined;
  };
  selectMapdata?: {
    value: number | string;
    label: JSX.Element;
  }[];
}

export interface FildTypeProduct {
  id: number;
  image: {
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
  results: {
    id: number;
    image?: {
      file: File;
    };
    title: string;
    price: number;
    is_available: boolean;
    category: {
      id: number;
      name: string;
    };
    is_new: boolean;
  }[];
}

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const ProductForm: React.FC<Props> = ({
  onFinish,
  initialValues,
  selectMapdata,
  loading,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  return (
    <Form
      name="ProductForm"
      {...formItemLayout}
      onFinish={onFinish}
      layout="vertical"
      initialValues={{
        title: initialValues?.title,
        price: initialValues?.price,
        is_new: initialValues?.is_new,
        is_available: initialValues?.is_available,
        category: initialValues?.category,
      }}
      style={{ maxWidth: 600 }}
    >
      <Form.Item
        name="category"
        label="Select"
        hasFeedback
        rules={[{ required: true, message: "Catygoryni tanlang !" }]}
      >
        <Select options={selectMapdata} />
      </Form.Item>
      <Form.Item
        label="Product Nomi"
        name="title"
        rules={[{ required: true, message: "Product Nomini unuttingiz" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Product price"
        name="price"
        rules={[{ required: true, message: "Product priceni unuttingiz" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="is_new" label="Is New" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item
        name="is_available"
        label="Is available"
        valuePropName="checked"
      >
        <Switch />
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
      {initialValues && !fileList.length && (
        <Image style={{ width: 200 }} src={initialValues.image} />
      )}

      <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
        <Space>
          <Button type="primary" loading={loading} htmlType="submit">
            Submit
          </Button>
          <Button htmlType="reset">reset</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default ProductForm;
