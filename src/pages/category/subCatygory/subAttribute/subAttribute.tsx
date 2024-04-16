import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Spin, Table, message } from "antd";
import React, { useState } from "react";
import {
  DataTypeAtrebute,
  useGetAtrebute,
} from "./service/query/useGetAtrebute";
import { useNavigate } from "react-router-dom";
import { useAtrebuteDelete } from "./service/mutation/useAtrebuteDelete";

const SubAttribute: React.FC = () => {
  const navigete = useNavigate();
  const { data, isLoading } = useGetAtrebute();
  const [deletestate, setDeletestate] = useState<number[]>([]);
  const { mutate, isPending } = useAtrebuteDelete();
  const Deletenotify = () => message.success("Malumot o'chirildi");
  const del = (id: number) => {
    mutate(id, {
      onSuccess: () => {
        setDeletestate([...deletestate, id]);
        Deletenotify();
      },
    });
  };
  const edit = (id: number) => {
    navigete(`/home/ediCatygory/${id}`);
  };
  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "title", key: "title" },

    {
      title: "Create",
      dataIndex: "",
      render: (_: number, data: DataTypeAtrebute) => (
        <div className="button_container">
          <Popconfirm
            onConfirm={() => edit(data.id)}
            title="Malumotni tahrirlaysizmi 😊 !!"
          >
            <Button type="primary">
              Edit
              <EditOutlined />
            </Button>
          </Popconfirm>

          <Popconfirm
            onConfirm={() => del(data.id)}
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
  const product = data?.results?.map((item) => ({
    title: item.title,
    id: item.id,
    key: item.id,
  }));
  const fillterData = product
    ? product.filter((item) => !deletestate.includes(item.id))
    : [];
  return (
    <>
      {isLoading || isPending ? (
        <Spin fullscreen size="large" />
      ) : (
        <>
          {/* <Link to={"/home/createCatygory"}>
            <Button type="primary" style={{ marginBottom: 16 }}>
              Create
            </Button>
          </Link> */}
          <Table columns={columns} dataSource={fillterData} />
        </>
      )}
    </>
  );
};

export default SubAttribute;
