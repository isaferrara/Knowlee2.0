import {
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    ShopOutlined,
    TeamOutlined,
    UserOutlined,
    UploadOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';
  import React from 'react'
import { Divider, Layout, Menu } from 'antd';
import { Link } from 'react-router-dom'
import { useContextInfo } from '../hooks/context'
import { logoutFn } from '../services/auth'

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;


const LayoutDash = ({ children }) => {
    const { user, logout } = useContextInfo()

    async function handleLogout() {
      await logoutFn()
      logout()
    }
  
    return (
      <div className="main" style={{backgroundColor:'#DCDCDC'}}>
          <Header className="header" style={{paddingLeft:'200px'}}>
        <div className="logo" style={{display:'flex', justifyContent:'right'}}/>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1">
            <Link to="/">
              Home
            </Link>
          </Menu.Item>
          <Menu.Item key="7">
              <Link to="/discover">
              Discover
              </Link>
          </Menu.Item>
          {!user ? <>
            <Menu.Item key="2">
              <Link to="/signup">
                Signup
            </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/login">
                Login
            </Link>
            </Menu.Item>
          </> : <React.Fragment>
            <Menu.Item key="4">
              <Link to="/choose-donation">
              Donate
              </Link>
            </Menu.Item>
            <Menu.Item key="5" onClick={handleLogout}>
              <Link to="/">
              Logout
              </Link>
            </Menu.Item>
            <Menu.Item key="6">
                <Link to={`/dash/${user._id}`}>
                  Dashboard
              </Link>
              </Menu.Item>
            </React.Fragment>}

        </Menu>
      </Header>
    <Content style={{ padding: '0 50px' }}>
      <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        paddingTop: '70px',
      }}
    >
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} 
       style={{shadowBox: '100px'}}>
        <Menu.Item key="1" icon={<UserOutlined />}>
        <Link to={`/dash/${user._id}`}>
           Dashboard
        </Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
        <Link to={`/news`}>
           Newsfeed
        </Link>        
        </Menu.Item>
        <Menu.Item key="3" icon={<UploadOutlined />}>
        <Link to={`/explore`}>
           Explore paths
        </Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<BarChartOutlined />}>
        <Link to={"/profile"}>
            Profile
        </Link>
        </Menu.Item>
        <Divider> --- </Divider>
        <Menu.Item key="5" onClick={handleLogout}>
              <Link to="/">
              Logout
              </Link>
        </Menu.Item>
      </Menu>
    </Sider>
    <Content
          style={{
            padding: 80,
            marginLeft: 150,
            minHeight: 280,
          }}
        >
        <div style={{ padding: 44, textAlign: 'center', width:'1100px', background: '#fff', marginTop:'50px', shadowBox:'-12px -1px 81px -32px', borderRadius:'20px'}}>
        {children}
        </div>

        </Content>
    </Content>

    </div>
    )
}

export default LayoutDash


  

