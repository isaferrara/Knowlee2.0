import React from 'react'
import {Layout, Menu,  Row, Col, Form, Input, Button, Typography, Divider,message } from 'antd'
import { loginFn, profile } from '../services/auth'
import { useContextInfo } from '../hooks/context'
import { Link } from 'react-router-dom'
import { logoutFn } from '../services/auth'
import {
  UserOutlined,
  BarChartOutlined
} from '@ant-design/icons';

const { Header} = Layout;
const { SubMenu } = Menu;
const { Title } = Typography

const googleUrl = process.env.NODE_ENV === 'development' ?
  "http://localhost:3000/auth/google" : '/auth/google'

const Login = ({ history }) => {
  const [form] = Form.useForm()
  const { login, user, logout} = useContextInfo()

  async function handleLogout() {
    await logoutFn()
    logout()
  }


  async function handleSubmit(userInput) {

    try {
      await loginFn(userInput)
      const {
        data: { user }
      } = await profile()
      login(user)
      history.push(`/dash/${user._id}`)
    } catch (err) {
      message.error("Error with email or password")
    }
  }
  return (
    <div>
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

    <div style={{backgroundImage: 'url(https://pngimage.net/wp-content/uploads/2018/06/%E0%B8%AA%E0%B8%B5%E0%B9%80%E0%B8%97%E0%B8%B2-png-4.png)', width: '100%', height:'800px', paddingTop:'0'}}>
    <div style={{ padding: '160px 404px 120px 400px'}}>
    <div style={{padding: '50px', background: 'rgba( 229, 229, 229, 0.25)', boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
      backdropFilter: 'blur( 5.0px )', WebkitBackdropFilter: 'blur( 5.0px )', borderRadius: '10px' }}> 
    <Row>
      <Col span={24}>
        <Title level={1} style={{color:'gray'}}>Login to empower your skills!</Title>
      </Col>
      <Divider />
      <Col span={24}>
        <Form layout="vertical" form={form} onFinish={handleSubmit}  style={{ borderRadius: '20px'}}>
          <Form.Item name='username' label="Username:" style={{color:'gray'}}>
            <Input  style={{ borderRadius: '20px', background:'white'}}/>
          </Form.Item>
          <Form.Item name='password' label="Password:" style={{color:'gray'}}>
            <Input.Password  />
          </Form.Item>
          <Button type="primary" block htmlType="submit" style={{color:'white'}}>
            Login
          </Button>
        </Form>
        {/* <Divider>
          Or
        </Divider>
        <a href={googleUrl}>
          <Button block>Login with Google</Button>
        </a> */}
      </Col>
    </Row>
    </div>
  </div>
  </div>
  </div>
  )
}

export default Login
