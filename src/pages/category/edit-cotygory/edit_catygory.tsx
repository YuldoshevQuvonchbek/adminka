import { useParams } from "react-router-dom";
import GetEditForm from "../../../components/form/get-Edit/get-Edit-form";
import { useEditCatygory } from "./service/mutation/useEditCatygory";
import {
  Button,
  Image,
  Popconfirm,
  Table,
  TableProps,
  Tabs,
  TabsProps,
  message,
} from "antd";
import { useNavigate } from "react-router-dom";
import { FildTypeCategory } from "../../../components/form/get-Edit/get-Edit-form";
import { useGetEditCatygory } from "./service/query/useGetCatytgoryEdit";
import { Spin } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useGetSubCatygory } from "../subCatygory/service/query/useGetSubCatygory";
import { useDelete } from "../../service/mutation/useDelete";

export interface imgeObject {
  file: File;
  fileList: File[];
}

const onChange = (key: string) => {
  console.log(key);
};

const EdiCatygory = () => {
  const naviget = useNavigate();
  const Deletenotify = () => message.success("Malumot o'chirildi");
  const [deletestate, setDeletestate] = useState<number[]>([]);
  const { id } = useParams<{ id: string }>();
  const { mutate } = useEditCatygory(id);
  const { data, isLoading } = useGetEditCatygory(id as string);
  const { mutate: subDelete } = useDelete();
  const { data: subData, isLoading: subloding } = useGetSubCatygory();

  const editSubdata = data?.children?.map((item) => ({
    key: item.id,
    name: item.title,
    id: item.id,
    img: item.image,
  }));

  const fillterData = editSubdata
    ? editSubdata.filter((item: any) => !deletestate.includes(item.id))
    : [];

  interface typeColumn {
    id: number;
    title: string;
    dataIndex: string;
    key: string;
    img: string | undefined;
  }

  const onFinish = (values: FildTypeCategory) => {
    const formObject = new FormData();
    formObject.append("title", values.title);
    if (values.image?.file) {
      formObject.append("image", values.image.file);
    }
    mutate(formObject, {
      onSuccess: () => {
        message.success("Yangilandi :)");
        naviget("/home/catygoryList");
      },
      onError: () => {
        message.error("Hatolik :(");
      },
    });
  };

  const del = (id: number) => {
    subDelete(id, {
      onSuccess: () => {
        setDeletestate([...deletestate, id]);
        Deletenotify();
      },
    });
  };
  const edit = (id: number) => {
    naviget(`/home/editSubcatygory/${id}`);
  };

  const columns: TableProps<typeColumn>["columns"] = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Image",
      dataIndex: "img",
      key: "img",
      render: (data: string) => {
        return <Image width={"100px"} height={"100px"} src={data} />;
      },
    },
    {
      title: "Create",
      dataIndex: "",
      render: (_, subdata) => (
        <div className="button_container">
          <Popconfirm
            onConfirm={() => edit(subdata.id)}
            title="Malumotni tahrirlaysizmi 😊 !!"
          >
            <Button type="primary">
              Edit
              <EditOutlined />
            </Button>
          </Popconfirm>

          <Popconfirm
            onConfirm={() => del(subdata.id)}
            title="Malumotni uchirasizmi 😒 ?"
          >
            <Button type="primary" danger>
              Delete
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Catygory yangilash",
      children: (
        <GetEditForm
          loading={isLoading}
          initialValues={{ title: data?.title, image: data?.image }}
          onFinish={onFinish}
        />
      ),
    },
    {
      key: "2",
      label: "Sub catygory yangilash",
      children: (
        <Table columns={columns as typeColumn[]} dataSource={fillterData} />
      ),
    },
  ];
  return (
    <>
      {isLoading || subloding ? (
        <Spin fullscreen size="large" />
      ) : (
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      )}
    </>
  );
};

export default EdiCatygory;
