import React, { useState } from "react";
import {
  Button,
  Image,
  Modal,
  Pagination,
  PaginationProps,
  Popconfirm,
  Spin,
  Table,
  message,
  Input,
} from "antd";
import { useGetProduct } from "./service/query/useGetProduct";

import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useDelete } from "../../service/mutation/useDelete";
import { Link, useNavigate } from "react-router-dom";

import "./style.scss";
import { useSearchCatygory } from "./service/query/useSearchCatygory";

const { Search } = Input;

const CatygoryList: React.FC = () => {
  //

  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  //
  const navigete = useNavigate();
  const [page, setPage] = useState<number>(0);
  const [pagination, setPagination] = useState(1);
  const { data, isLoading } = useGetProduct("id", page);
  const [deletestate, setDeletestate] = useState<number[]>([]);

  const [search, setSeach] = useState("");
  const { data: searchData } = useSearchCatygory(search);

  const { mutate, isPending } = useDelete();
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

  const paginationNumber: PaginationProps["onChange"] = (page) => {
    setPagination(page);
    setPage((page - 1) * 5);
  };

  const product = data?.Catygorydata?.results?.map((item) => ({
    title: item.title,
    id: item.id,
    key: item.id,
    image: item.image,
  }));

  const productSarch = searchData?.results?.map((item) => ({
    title: item.title,
    id: item.id,
    key: item.id,
    image: item.image,
  }));

  const fillterData = product
    ? product.filter((item) => !deletestate.includes(item.id))
    : [];
  const fillterDataSearc = productSarch
    ? productSarch.filter((item) => !deletestate.includes(item.id))
    : [];
  return (
    <>
      {isLoading || isPending ? (
        <Spin fullscreen size="large" />
      ) : (
        <>
          <div className="search_contianer">
            <Link to={"/home/createCategory"}>
              <Button
                type="primary"
                style={{ marginBottom: 16, marginRight: 16 }}
              >
                Create New Category
              </Button>
            </Link>
            <Button onClick={showModal}>
              <SearchOutlined />
            </Button>
            <Modal
              title="Search Modal"
              open={open}
              onOk={hideModal}
              onCancel={hideModal}
              width={1000}
            >
              <Search
                placeholder="input search text"
                size="large"
                value={search}
                onChange={(e) => setSeach(e.target.value.trimStart())}
              />
              <div className="search_List">
                {search.length >= 2 ? (
                  <div>
                    {fillterDataSearc?.map((item) => (
                      <div className="cart_container" key={item.id}>
                        <div className="box">
                          <Image style={{ width: 100 }} src={item.image} />

                          <h2 className="cart_container_title">{item.title}</h2>
                        </div>
                        <div className="box2">
                          <Popconfirm
                            onConfirm={() => del(item.id)}
                            title="Malumotni uchirasizmi 😒 ?"
                          >
                            <Button danger>
                              Delete
                              <DeleteOutlined />
                            </Button>
                          </Popconfirm>
                          <Popconfirm
                            onConfirm={() => edit(item.id)}
                            title="Malumotni tahrirlaysizmi 😊 !!"
                          >
                            <Button>
                              Edit
                              <EditOutlined />
                            </Button>
                          </Popconfirm>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <h1>Malumot Yo'q</h1>
                )}
              </div>
            </Modal>
          </div>
          <Table
            pagination={false}
            columns={columns}
            dataSource={fillterData}
          />
          <Pagination
            onChange={paginationNumber}
            total={data?.pageSize}
            defaultCurrent={page}
            current={pagination}
            pageSize={5}
            style={{ display: "flex", justifyContent: "end" }}
          />
        </>
      )}
    </>
  );
};

export default CatygoryList;
