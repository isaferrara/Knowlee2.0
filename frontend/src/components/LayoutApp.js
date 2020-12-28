import React from 'react'
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom'
import {
  BarChartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useContextInfo } from '../hooks/context'
import { logoutFn } from '../services/auth'
const { Header, Content } = Layout;

const { SubMenu } = Menu;

const LayoutApp = ({ children }) => {
  const { user, logout } = useContextInfo()

  async function handleLogout() {
    await logoutFn()
    logout()
  }

  return (
    <Layout className="layout">
    <div >
    <Header className="header" style={{paddingLeft:'200px', backgroundColor:'#335E7A'}}>
        <div className="logo" style={{display:'flex', justifyContent:'right'}}/>
        <Menu theme="dark" mode="horizontal" style={{ backgroundColor:'#335E7A'}}>
          <Menu.Item key="1">
            <Link to="/">
              Home
            </Link>
          </Menu.Item>

          {!user ? <>
            <Menu.Item key="7">
              <Link to="/discover">
              Featured
              </Link>
          </Menu.Item>
          

            <Menu.Item key="3">
              <Link to="/login">
                Login
            </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/signup">
              Create Account
            </Link>
            </Menu.Item>

          </> : <React.Fragment>
          <Menu.Item key="6">
              <Link to="/choose-donation">
              Donate
              </Link>
            </Menu.Item>

            <SubMenu key="SubMenu" title="Profile">
                <Menu.Item key="7" icon={<UserOutlined />}>
                    <Link to={`/dash/${user._id}`} >
                      Dashboard
                  </Link>
                  </Menu.Item>

                <Menu.Item key="15" icon={<BarChartOutlined />}>
                  <Link to={"/profile"}>
                      Profile
                  </Link>
                </Menu.Item>

                <Menu.Item key="16" onClick={handleLogout} style={{ borderTop:'1px solid gray'}}>
                  <Link to="/"  >
                  Logout
                  </Link>
                </Menu.Item>
             </SubMenu>

            </React.Fragment>
            }

        </Menu>
      </Header>
      <br />
      <Content style={{display:'flex', flexDirection:'row', flexWrap:'wrap', justifyContent:'space-around', alignItems:'center'}} >
        <div className="site-layout-content" style={{backgroundColor:'white'}}>{children}</div>
      </Content>
      </div>
    </Layout>
  )
}

export default LayoutApp
