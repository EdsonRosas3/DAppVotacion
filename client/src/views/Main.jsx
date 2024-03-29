import React, { useState, useEffect, useContext } from "react";
import { Layout, Menu, Avatar } from 'antd';
import { NavLink, Outlet } from 'react-router-dom';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import { routes } from '../_nav';
import UserContext from "../context/user/UserContext";
import ContractContext from "../context/contract/ContractContext";

const { Header, Sider, Content } = Layout;

const SiderDemo = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { updateDataAuth, user } = useContext(UserContext);
  const { initialContract } = useContext(ContractContext);
  const toggle = () => {
    setCollapsed(!collapsed);
  }



  useEffect(() => {
    updateDataAuth();
    initialContract();
  }, []);
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['0']}
        >
          {routes.map((item, index) => (
            <Menu.Item key={index} icon={item.icon}>
              <NavLink to={item.path}>{item.label}</NavLink>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}
          {user && <> { user.username } <Avatar style={{ backgroundColor: '#f56a00' }}>{user.username.charAt(0).toUpperCase()}</Avatar> </>}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
export default SiderDemo;