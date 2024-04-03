import React, { useState } from "react";
import "./style.scss";
import {
  BarChartOutlined,
  DatabaseOutlined,
  LoginOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  OrderedListOutlined,
  PicLeftOutlined,
  SmileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { NavLink, Navigate, Outlet } from "react-router-dom";
import { loadState } from "../config/story";

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const user = loadState("user");
  if (!user) return <Navigate to={"/"} replace />;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <div>
      <Header>
        <h2 className="header_text">
          ADMIN
          <SmileOutlined />
        </h2>
      </Header>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <BarChartOutlined />,
                label: <NavLink to={"/home/pointer"}>Reyting</NavLink>,
              },
              {
                key: "2",
                icon: <OrderedListOutlined />,
                label: (
                  <NavLink to={"/home/catygoryList"}>Category List</NavLink>
                ),
              },
              {
                key: "3",
                icon: <PicLeftOutlined />,
                label: (
                  <NavLink to={"/home/Subcatygory"}>Sub category List</NavLink>
                ),
              },
              {
                key: "4",
                icon: <DatabaseOutlined />,
                label: <NavLink to={"/home/brand"}>Brand</NavLink>,
              },
              {
                key: "5",
                icon: <DatabaseOutlined />,
                label: <NavLink to={"/home/subAttribute"}>Atrebute</NavLink>,
              },
              {
                key: "6",
                icon: <UserOutlined />,
                label: <NavLink to={"/home/User"}>User</NavLink>,
              },
              {
                key: "7",
                icon: <LoginOutlined />,
                label: <NavLink to={"/home"}>Log out</NavLink>,
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: "75.9vh",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default MainLayout;
