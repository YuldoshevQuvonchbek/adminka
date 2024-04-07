import React, { useState } from "react";
import { Button, Image, Popconfirm, Spin, Table, message } from "antd";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useGetProductData } from "../service/query/useGetProductData";
import { useProductDelete } from "../service/mutation/useProductDelete";

const ProductList: React.FC = () => {
  const navigete = useNavigate();
  const { data, isLoading } = useGetProductData();

  const [deletestate, setDeletestate] = useState<number[]>([]);
  const { mutate, isPending } = useProductDelete();
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
    navigete(`/home/editProduct/${id}`);
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
    id: item.id,
    key: item.id,
    price: item.price,
    image: item.image,
    is_available: item.is_available,
    is_new: item.is_new,
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
          <Link to={"/home/productCreate"}>
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

export default ProductList;
