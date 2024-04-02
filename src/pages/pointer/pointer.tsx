import React from "react";
import { UnorderedListOutlined } from "@ant-design/icons";
import { Card, Col, Row, Spin, Statistic } from "antd";
import img from "../../assets/img/reytingimg.jpg";
import "../style.scss";
import { useGetProduct } from "../service/query/useGetProduct";
import { useGetSubCatygory } from "../category/subCatygory/service/query/useGetSubCatygory";
import { useGetBrand } from "../brand/service/query/useGetBrand";
import { Link } from "react-router-dom";
const Pointer: React.FC = () => {
  const { data, isLoading } = useGetProduct();
  const { data: subData, isLoading: subLoding } = useGetSubCatygory();
  const { data: brantData, isLoading: BrandLoding } = useGetBrand();
  console.log(data);

  return (
    <>
      {isLoading || subLoding || BrandLoding ? (
        <Spin fullscreen size="large" />
      ) : (
        <div>
          {data || subData || brantData ? (
            <Row gutter={16}>
              <Col span={12}>
                <Link to={"/home/catygoryList"}>
                  <Card bordered={false}>
                    <Statistic
                      title="All Catygory"
                      value={data?.count}
                      valueStyle={{ color: "#3f8600" }}
                      prefix={<UnorderedListOutlined />}
                    />
                  </Card>
                </Link>
              </Col>
              <Col span={12}>
                <Link to={"/home/Subcatygory"}>
                  <Card bordered={false}>
                    <Statistic
                      title="All Sub Catygory"
                      value={subData?.count}
                      valueStyle={{ color: "#cf1322" }}
                      prefix={<UnorderedListOutlined />}
                    />
                  </Card>
                </Link>
              </Col>
              <Col span={12}>
                <Link to={"/home/brand"}>
                  <Card bordered={false}>
                    <Statistic
                      title="All Brand"
                      value={brantData?.count}
                      valueStyle={{ color: "#cfdb31" }}
                      prefix={<UnorderedListOutlined />}
                    />
                  </Card>
                </Link>
              </Col>
            </Row>
          ) : (
            <div className=" bg_container">
              <img className="bg_img" src={img} alt="" />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Pointer;
