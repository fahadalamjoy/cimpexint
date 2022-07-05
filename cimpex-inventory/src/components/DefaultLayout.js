import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  HomeOutlined,
  UnorderedListOutlined,
  SearchOutlined,
  LoginOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import "../resourses/layout.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import cimpex from '../resourses/cimpex.png'


const { Header, Sider, Content } = Layout;

const DefaultLayout = (props) => {
  const [collapsed, setCollpased] = useState(false);
  const { cartItems, loading } = useSelector((state) => state.rootReducer);
  const navigate = useNavigate();
  const toggle = () => {
    setCollpased(!collapsed);
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout>
      {loading && (
        <div className="spinner">
          <div className="spinner-border" role="status"></div>
          Loading ...
        </div>
      )}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
        <img className="cimpex main-logo" src={cimpex} alt='cimpex'/>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
        >
          <Menu.Item key="/home" icon={<HomeOutlined />}>
            <Link to="/home">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="/sales" icon={<UnorderedListOutlined />}>
            <Link to="/sales">Add Sales</Link>
          </Menu.Item>
          <Menu.Item key="/search" icon={<SearchOutlined />}>
            <Link to="/search">Search</Link>
          </Menu.Item>
          
          <Menu.Item key="/customers" icon={<UserOutlined />}>
            <Link to="/customers">Customers</Link>
          </Menu.Item>
          <Menu.Item
            key="/logout"
            icon={<LoginOutlined />}
            onClick={() => {
              localStorage.removeItem("pos-user");
              navigate("/login");
            }}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 10 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
          
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "10px ",
            padding: 24,
            minHeight: "80hv",
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
