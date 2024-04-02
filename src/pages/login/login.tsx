import { useLogin } from "./service/mutation/userLogin";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Button, Form, Input } from "antd";
import { saveState } from "../../config/story";
import "./style.scss";

export type FieldType = {
  phone_number: string;
  password: string;
};

const Login: React.FC = () => {
  const naviget = useNavigate();
  const { mutate, isPending } = useLogin();

  const onFinish = (values: FieldType) => {
    mutate(values, {
      onSuccess: (data: any) => {
        saveState("user", data);
        naviget("/home/pointer");
      },
    });
  };

  return (
    <section className="bg_fon">
      <div className=" form_container">
        <Form
          className="form"
          name="basic"
          layout="vertical"
          style={{ maxWidth: 600 }}
          initialValues={{ phone_number: "+998977109944" }}
          onFinish={onFinish}
        >
          <Form.Item
            label="phone_number"
            name="phone_number"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button loading={isPending} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default Login;
