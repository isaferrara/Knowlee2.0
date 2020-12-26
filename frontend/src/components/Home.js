import React, {useState, useEffect} from 'react';
import { getAllPaths } from '../services/paths.js'
import AppHero from '../components/home/hero';
import AppAbout from '../components/home/about';
import AppFeature from '../components/home/feature';
import Appworks from '../components/home/works';
import Appfaq from '../components/home/faq';
import AppPricing from '../components/home/pricing';
import AppContact from '../components/home/contact';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom'
import { useContextInfo } from '../hooks/context'
import { logoutFn } from '../services/auth'
import {
  BarChartOutlined,
  MailOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

const { Header } = Layout;
const { SubMenu } = Menu;

function Home() {
  const { user, logout } = useContextInfo()
  const [pathsy, setPaths] = useState(null)

  async function handleLogout() {
    await logoutFn()
    logout()
  }
  useEffect(() => {
      async function getPaths() {
          const {data} = await getAllPaths()
          setPaths(data)
      }
      getPaths()
      }, [])  
  return (
      <div className="main">
<Header className="header" style={{paddingLeft:'200px',backgroundColor:'#335E7A'}}>
        <div className="logo" style={{display:'flex', justifyContent:'right'}}/>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1">
            <Link to="/">
              Home
            </Link>
          </Menu.Item>

          {!user ? <>
            <Menu.Item key="7">
              <Link to="/discover">
              Discover
              </Link>
          </Menu.Item>
            <Menu.Item key="2" >
              <Link to="/signup">
                Signup
            </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/login">
                Login
            </Link>
            </Menu.Item>
          </> 
          : <React.Fragment>
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
            
            </React.Fragment>}

        </Menu>
      </Header>
          <AppHero />          
          <AppAbout />    
          <AppFeature /> 
          <Appworks />
          <Appfaq />
          <AppPricing />
          <AppContact />
     </div>

        
  );
}

export default Home;
