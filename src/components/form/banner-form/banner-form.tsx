import { ArrowDownOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Image,
  Input,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import React, { useState } from "react";

interface Props {
  onFinish: (values: FildTypeBanner) => void;
  loading: boolean;
  initialValues?: {
    title?: string;
    image?: string | undefined;
  };
}

export interface FildTypeBanner {
  title: string;
  image?: {
    file: File;
  };
  description: string;
}

const BannerForm: React.FC<Props> = ({ onFinish, initialValues, loading }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  return (
    <Form
      name="GetEditForm"
      layout="vertical"
      colon={false}
      style={{ maxWidth: 600 }}
      initialValues={{ title: initialValues?.title }}
      onFinish={onFinish}
    >
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
      {initialValues && !fileList.length && (
        <Image style={{ width: 200 }} src={initialValues.image} />
      )}
      <Form.Item>
        <Button
          style={{ margin: 20 }}
          loading={loading}
          type="primary"
          htmlType="submit"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BannerForm;
