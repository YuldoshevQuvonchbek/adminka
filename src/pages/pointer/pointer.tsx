import React from "react";
import { UnorderedListOutlined } from "@ant-design/icons";
import { Card, Col, Row, Spin, Statistic } from "antd";
import img from "../../assets/img/reytingimg.jpg";
import "../style.scss";
import { useGetProduct } from "../service/query/useGetProduct";
import { useGetSubCatygory } from "../category/subCatygory/service/query/useGetSubCatygory";
import { useGetBrand } from "../brand/service/query/useGetBrand";
import { Link } from "react-router-dom";
import { useGetAtrebute } from "../category/subCatygory/subAttribute/service/query/useGetAtrebute";
import { useGetProductData } from "../product/service/query/useGetProductData";
import { useGetBanner } from "../banner/service/query/useGetBanner";
const Pointer: React.FC = () => {
  const { data, isLoading } = useGetProduct();
  const { data: subData, isLoading: subLoding } = useGetSubCatygory();
  const { data: brantData, isLoading: BrandLoding } = useGetBrand();
  const { data: AtrebutData, isLoading: atrebutLoding } = useGetAtrebute();
  const { data: Product, isLoading: ProductLoding } = useGetProductData();
  const { data: Banner, isLoading: BannerLoding } = useGetBanner();

  return (
    <>
      {isLoading ||
      subLoding ||
      BrandLoding ||
      atrebutLoding ||
      ProductLoding ||
      BannerLoding ? (
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
                      value={subData?.data?.count}
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
                      value={brantData?.data?.count}
                      valueStyle={{ color: "#cfdb31" }}
                      prefix={<UnorderedListOutlined />}
                    />
                  </Card>
                </Link>
              </Col>
              <Col span={12}>
                <Link to={"/home/subAttribute"}>
                  <Card bordered={false}>
                    <Statistic
                      title="All atribute"
                      value={AtrebutData?.count}
                      valueStyle={{ color: "#2956b0" }}
                      prefix={<UnorderedListOutlined />}
                    />
                  </Card>
                </Link>
              </Col>
              <Col span={12}>
                <Link to={"/home/productList"}>
                  <Card bordered={false}>
                    <Statistic
                      title="All Product"
                      value={Product?.data?.count}
                      valueStyle={{ color: "#b029a0" }}
                      prefix={<UnorderedListOutlined />}
                    />
                  </Card>
                </Link>
              </Col>
              <Col span={12}>
                <Link to={"/home/bannerList"}>
                  <Card bordered={false}>
                    <Statistic
                      title="All Banner"
                      value={Banner?.data?.count}
                      valueStyle={{ color: "#8dd676" }}
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
