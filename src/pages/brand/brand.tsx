import { Button, Image, Popconfirm, Spin, Table, message } from "antd";
import { useGetBrand } from "./service/query/useGetBrand";
import { Link, useNavigate } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDeleteBrand } from "./service/mutation/brandDelete";
import { useState } from "react";
import "../style.scss";
const Brand = () => {
  const navigete = useNavigate();
  const { data, isLoading } = useGetBrand();
  console.log(data);

  const [deletestate, setDeletestate] = useState<number[]>([]);
  const Deletenotify = () => message.success("Brand o'chirildi");
  const { mutate, isPending } = useDeleteBrand();
  const del = (id: number) => {
    mutate(id, {
      onSuccess: () => {
        setDeletestate([...deletestate, id]);
        Deletenotify();
      },
    });
  };
  const edit = (id: number) => {
    navigete(`/home/bandEdit/${id}`);
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
    key: item.id,
    id: item.id,
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
          <Link to={"/home/brandCrate"}>
            <Button type="primary" style={{ marginBottom: 16 }}>
              Create
            </Button>
          </Link>
          <Table columns={columns} dataSource={fillterData} />
        </>
      )}
    </>
  );
};

export default Brand;
