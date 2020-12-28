import {
    BarChartOutlined,
    MailOutlined,
    UserOutlined,
    UploadOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';
  import React, {useState}from 'react'
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom'
import { useContextInfo } from '../hooks/context'
import { logoutFn } from '../services/auth'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


const LayoutDash = ({ children }) => {
    const { user, logout } = useContextInfo()
    const rootSubmenuKeys = ['sub1'];
    const [openKeys, setOpenKeys] = useState(['sub1']);

    async function handleLogout() {
      await logoutFn()
      logout()
    }
    
      const onOpenChange = keys => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
          setOpenKeys(keys);
        } else {
          setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
      };
    
    return (
      <div className="main" style={{backgroundColor:'#F7F7F5'}}>
          <Header className="header" style={{paddingLeft:'200px', backgroundColor:'#335E7A'}}>
        <div className="logo" style={{display:'flex', justifyContent:'right'}}/>
        <Menu theme="dark" mode="horizontal"  >
          <Menu.Item key="1">
            <Link to="/">
              Home
            </Link>
          </Menu.Item>
          {!user ? <>
            <Menu.Item key="2">
              <Link to="/discover">
              Featured
              </Link>
          </Menu.Item>
          <div style={{border:'1px solid white'}}>

            <Menu.Item key="4">
              <Link to="/login">
                Login
            </Link>
            </Menu.Item>
            <Menu.Item key="3" >
              <Link to="/signup">
                Create Account
            </Link>
            </Menu.Item>
          </div>
          </> : <>
            <Menu.Item key="5">
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
              </> }
        </Menu>
      </Header>
    <Content style={{ padding: '0 50px' }}>
      <Sider
      style={{
        backgroundColor:'white',
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        paddingTop: '70px',
        boxShadow: '0px 10px 10px 0px #888'
      }}
    >
      <div className="logo" />
      <Menu  defaultOpenKeys={['sub1']} mode="inline" defaultSelectedKeys={['8']} style={{shadowBox: '100px', backgroundColor:'white'}} openKeys={openKeys} onOpenChange={onOpenChange}>
     
     {/* profile info */}
        <div style={{display : 'flex', justifyContent:'center', alignItems:'center', flexDirection:'column',  margin:'40px 0px 30px 0px'}}>
        <Link to={`/profile`}><img src={user.image} style={{width:'75px', height:'75px', borderRadius:'50%', marginBottom:'20px'}} /> </Link>
            <h1>{user.username}</h1>
        </div>
      {/* submenu */}
        <Menu.Item key="8" icon={<UserOutlined />}>
          <Link to={`/dash/${user._id}`}> Dashboard </Link>
        </Menu.Item>

      <SubMenu  style={{ backgroundColor:'white', padding:'0px'}} key="sub1" icon={<MailOutlined />} title='My paths'> 
 
        <Menu.Item style={{ backgroundColor:'white', padding:'0px'}} key="9" icon={<UserOutlined />}>
          <Link to={`/my-paths/${user._id}`}> All my Paths </Link>
        </Menu.Item>

        <Menu.Item style={{ backgroundColor:'white'}} key="10" icon={<UserOutlined />}>
          <Link to={`/favorites/${user._id}`}> Favorites </Link>
        </Menu.Item>

        <Menu.Item style={{ backgroundColor:'white', padding:'0px'}} key="11" icon={<UserOutlined />}>
          <Link to={`/completed/${user._id}`}> Completed</Link>
        </Menu.Item>

        <Menu.Item  style={{ backgroundColor:'white', padding:'0px'}} key="12" icon={<UserOutlined />}>
          <Link to={`/progress/${user._id}`}> In Progress </Link>
        </Menu.Item>

      </SubMenu>

        <Menu.Item key="13" icon={<VideoCameraOutlined />}>
        <Link to={`/subs`}>
           Suscriptions
        </Link>        
        </Menu.Item>

        <Menu.Item key="14" icon={<UploadOutlined />}>
        <Link to={`/explore`}>
           Explore 
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
        <div style={{ padding: 44, textAlign: 'center', width:'1100px', shadowBox:'-12px -1px 81px -32px', borderRadius:'20px'}}>
        {children}
        </div>

        </Content>
    </Content>

    </div>
    )
}

export default LayoutDash
