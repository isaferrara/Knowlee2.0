import React from 'react'
import {Layout, Menu,  Row, Col, Form, Input, Button, Typography, Divider,message } from 'antd'
import { loginFn, profile } from '../services/auth'
import { useContextInfo } from '../hooks/context'
import { Link } from 'react-router-dom'
import { logoutFn } from '../services/auth'

const { Header} = Layout;

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
          </> : <React.Fragment>
            <Menu.Item key="6">
              <Link to="/choose-donation">
              Donate
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

    <div style={{backgroundImage: 'url("https://roundtables.abl.org/wp-content/uploads/2018/04/BlueBackground_150475949.jpg")', width: '100%', height:'800px', paddingTop:'0'}}>
    <div style={{ padding: '100px 304px'}}>
    <div style={{padding: '50px', background: 'white', borderRadius: '20px', background: '#F8F8F8'}}> 
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
        <Divider>
          Or
        </Divider>
        <a href={googleUrl}>
          <Button block>Login with Google</Button>
        </a>
      </Col>
    </Row>
    </div>
  </div>
  </div>
  </div>
  )
}

export default Login
