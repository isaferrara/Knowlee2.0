import React from 'react'
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom'
import { useContextInfo } from '../hooks/context'
import { logoutFn } from '../services/auth'
const { Header, Content, Footer } = Layout;


const LayoutApp = ({ children }) => {
  const { user, logout } = useContextInfo()

  async function handleLogout() {
    await logoutFn()
    logout()
  }

  return (
    <Layout className="layout">
    <div >
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
          <Menu.Item key="6">
              <Link to="/choose-donation">
              Donate
              </Link>
            </Menu.Item>
              <Menu.Item key="5" onClick={handleLogout}>
              <Link to="/">
              Logout
              </Link>
            </Menu.Item>
            
            <Menu.Item key="4">
                <Link to={`/dash/${user._id}`}>
                  Dashboard
              </Link>
              </Menu.Item>
            </React.Fragment>}

        </Menu>
      </Header>
      <br />
      <Content >
        <div className="site-layout-content" style={{backgroundColor:'white'}}>{children}</div>
      </Content>
      </div>
    </Layout>
  )
}

export default LayoutApp
