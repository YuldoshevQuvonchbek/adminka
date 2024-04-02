import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Image, Popconfirm, Spin, Table, message } from "antd";
import { useGetSubCatygory } from "./service/query/useGetSubCatygory";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSubDelete } from "./service/mutation/useSubDelete";

const Subcatygory = () => {
  const { data, isLoading } = useGetSubCatygory();

  const [deletestate, setDeletestate] = useState<number[]>([]);
  const { mutate, isPending } = useSubDelete();
  const Deletenotify = () => message.success("Malumot o'chirildi");
  const del = (id: number) => {
    mutate(id, {
      onSuccess: () => {
        setDeletestate([...deletestate, id]);
        Deletenotify();
      },
    });
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "title", key: "title" },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (data: string) => {
        return <Image src={data} style={{ width: 70 }} />;
      },
    },
    {
      title: "Create",
      dataIndex: "",
      render: (_: number, data: any) => (
        <div className="button_container">
          <Popconfirm
            // onConfirm={() => edit(data.id)}
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
    image: item.image,
  }));
  const fillterData = product
    ? product.filter((item: any) => !deletestate.includes(item.id))
    : [];

  return (
    <>
      {isLoading || isPending ? (
        <Spin fullscreen size="large" />
      ) : (
        <>
          <Link to={"/home/subCatygoryCreate"}>
            <Button type="primary" style={{ marginBottom: 16 }}>
              <PlusCircleOutlined />
              Create
            </Button>
          </Link>
          <Table columns={columns} dataSource={fillterData} />
        </>
      )}
    </>
  );
};

export default Subcatygory;
