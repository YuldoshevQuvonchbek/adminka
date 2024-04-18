import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Space, message } from "antd";
import { useAtrebuteDelete } from "../../../pages/category/subCatygory/subAttribute/service/mutation/useAtrebuteDelete";
import { useAtrebuteDeleteValue } from "../../../pages/category/subCatygory/subAttribute/service/mutation/useAtrebuteDeleteValue";

export interface AtribuateType {
  attributes: {
    attribute_id: null;
    title: string;
    values: {
      value: string;
      value_id: null;
    }[];
  }[];
  category_id?: string | number | undefined;
}
interface AtribuateFormType {
  atribuaterSubmit: (data: any) => void;
  initialValue?: {
    attributes: {
      id: number | undefined;
      title: string;
      values: {
        value: string;

        id: number | undefined;
      }[];
    }[];
  };
}

const SubAttributeForm: React.FC<AtribuateFormType> = ({
  atribuaterSubmit,
  initialValue,
}) => {
  const [form] = Form.useForm();

  const { mutate } = useAtrebuteDeleteValue();
  const { mutate: deleteAttribute } = useAtrebuteDelete();

  const deleteValue = (id: number) => {
    mutate(id, {
      onSuccess: () => {
        message.success("Uchirildi :)");
      },
      onError: () => {
        message.error("Error :(");
      },
    });
  };
  const deleteAttributeMe = (id: number) => {
    deleteAttribute(id, {
      onSuccess: () => {
        message.success("Uchirildi :)");
      },
      onError: () => {
        message.error("Error :(");
      },
    });
  };

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      form={form}
      name="dynamic_form_complex"
      style={{ maxWidth: 600 }}
      autoComplete="off"
      onFinish={atribuaterSubmit}
    >
      <Form.List name="items" initialValue={initialValue?.attributes}>
        {(fields, { add, remove }) => (
          <div style={{ display: "flex", rowGap: 16, flexDirection: "column" }}>
            {fields.map((field) => (
              <Card
                size="small"
                title={`Attribuate ${field.name + 1}`}
                key={field.key}
                extra={
                  <CloseOutlined
                    onClick={() => {
                      remove(field.name);
                      deleteAttributeMe(
                        Number(initialValue?.attributes[field.key].id)
                      );
                    }}
                  />
                }
              >
                <Form.Item label="Name" name={[field.name, "title"]}>
                  <Input />
                </Form.Item>

                <Form.Item label="Attribuate">
                  <Form.List name={[field.name, "values"]}>
                    {(subFields, subOpt) => (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          rowGap: 16,
                        }}
                      >
                        {subFields.map((subField) => (
                          <Space key={subField.key}>
                            <Form.Item noStyle name={[subField.name, "value"]}>
                              <Input placeholder="Value" />
                            </Form.Item>

                            <CloseOutlined
                              onClick={() => {
                                subOpt.remove(subField.name);
                                deleteValue(
                                  Number(
                                    initialValue?.attributes[field.key].values[
                                      subField.key
                                    ].id
                                  )
                                );
                              }}
                            />
                          </Space>
                        ))}
                        <Button
                          type="dashed"
                          onClick={() => subOpt.add()}
                          block
                        >
                          + Attribuate qushish
                        </Button>
                      </div>
                    )}
                  </Form.List>
                </Form.Item>
              </Card>
            ))}

            <Button type="dashed" onClick={() => add()} block>
              + Qushimcha Attribuate
            </Button>
          </div>
        )}
      </Form.List>
      <Button htmlType="submit">submit</Button>
    </Form>
  );
};

export default SubAttributeForm;
