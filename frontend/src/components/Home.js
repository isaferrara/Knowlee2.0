import React, {useState, useEffect} from 'react';
import { getAllPaths } from '../services/paths.js'
import AppHero from '../components/home/hero';
import Appworks from '../components/home/works';
import AppContact from '../components/home/contact';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom'
import { useContextInfo } from '../hooks/context'
import { logoutFn } from '../services/auth'
import {
  AppstoreAddOutlined,
  DeploymentUnitOutlined,
  UserOutlined,
  ShareAltOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import AppFeature from './home/feature.js';

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
      <div className="main" style={{backgroundColor:'white', width:'100%'}}>
<Header className="header" style={{backgroundColor:'#335E7A'}}>
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
              Featured
              </Link>
          </Menu.Item>
            
            <Menu.Item key="3">
              <Link to="/login">
                Login
            </Link>
            </Menu.Item>
            <Menu.Item key="2" >
              <Link to="/signup">
              Create Account
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
   
          <div style={{marginTop:'250px', marginBottom:'100px', display:'flex'}}>
            <div  style={{display:'flex',  width:'1400px', flexDirection:'row', justifyContent:'space-evenly'}} >
               <div style={{  width:'300px',textAlign:'center'}} >
               <AppstoreAddOutlined style={{fontSize:'70px'}}/>                              
                <b><h2 style={{fontSize:'40px'}}>Create</h2></b>
                    <p style={{fontWeight:'200'}}>Create learning paths to structure your knowledge.</p>
                </div>
                
                <div style={{  width:'300px', textAlign:'center'}}>
                <DeploymentUnitOutlined style={{fontSize:'70px'}} />
                <b><h2 style={{fontSize:'40px'}}>Network</h2></b>
                <p style={{fontWeight:'200'}}>Find new people, subscribe and learn from them and their experience.</p>
                </div>
                <div style={{  width:'300px', textAlign:'center'}}>
                <ShareAltOutlined style={{fontSize:'70px'}}/>
                <b><h2 style={{fontSize:'40px'}}>Share</h2></b>
                <p style={{fontWeight:'200'}}>Share what you have learned with our community.</p> 
                </div>

             

            </div>
       </div>  
          <Appworks />
          <AppContact />
     </div>

        
  );
}

export default Home;
