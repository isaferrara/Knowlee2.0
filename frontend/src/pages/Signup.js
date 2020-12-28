import React, { useState } from 'react'
import { Layout, Menu, Row, Col, Form, Input, Button, Typography, Divider, Upload } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {PasswordInput} from 'antd-password-input-strength'
import { signupFn } from '../services/auth'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { logoutFn } from '../services/auth'
import { useContextInfo } from '../hooks/context'
import {
  UserOutlined,
  BarChartOutlined
} from '@ant-design/icons';

const { Header} = Layout;
const { SubMenu } = Menu;
const { Title } = Typography

const cloudinaryAPI = 'https://api.cloudinary.com/v1_1/djjro5m0g/image/upload' 

const googleUrl = process.env.NODE_ENV === 'development' ?
  "http://localhost:3000/auth/google" : '/auth/google'

const Signup = ({ history }) => {
  const [form] = Form.useForm()
  const [img, setImg] = useState(null)
  const [loading, setLoading] = useState(null)
  const [sameName, setSameName] = useState(false)
  const { user} = useContextInfo()


  async function handleSubmit(userInput) {
    const usr = {...userInput, image: img}
      const {data} = await signupFn(usr)
      history.push('/login')  
    

  }



  async function handleUploadFile(file){
    setLoading(true)
    const data = new FormData()

    data.append('file', file)
    data.append('upload_preset', 'project-final-')

    const {data: {secure_url}} = await axios.post(cloudinaryAPI, data)

    setImg(secure_url)
    setLoading(false)
  }

  const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

  

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
             </SubMenu>
            
            </React.Fragment>}
        </Menu>
      </Header>
    <div style={{backgroundImage: 'url("https://pngimage.net/wp-content/uploads/2018/06/%E0%B8%AA%E0%B8%B5%E0%B9%80%E0%B8%97%E0%B8%B2-png-4.png")', width: '100%', height:'100%', paddingTop:'0'}}>
    <div style={{ padding: '100px 304px'}}>
    <div style={{padding: '50px', background: 'rgba( 255, 255, 255, 0.25 )', boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
      backdropFilter: 'blur( 5.0px )', WebkitBackdropFilter: 'blur( 5.0px )', borderRadius: '10px' }}>     <Row>
      
        <h2 style={{ margin:'0'}}>Sign up</h2>
  
      <Divider />
      <Col span={24}>
        <Form layout="vertical" form={form} onFinish={handleSubmit} initialValues={{ image: 'https://coa.pe/public/assets/img/default-user.png' }}>

          <Form.Item name='username' type='username' id='username' label="Username:" rules={[{ 
            required: true, message: 'Please input your username!' }]}>
            <Input />
          </Form.Item>
          {sameName?<p style={{position:'relative', paddingTop:'0px', color:'red', fontSize:'14px'}}> Try a different username </p>: <></> }

          <Form.Item name='email' type='email' id='email' label="Email:" rules={[{ required: true, message: 'Please input your password!' }]} >
            <Input />
          </Form.Item>

          <Form.Item name='password' type='password' id='password' label="Password:" rules={[{ required: true, message: 'Please input your password!' }]} hasFeedback>
            <PasswordInput />
          </Form.Item>

          <Form.Item name='image' id='image' label="Image:" valuePropName="fileList">
            <Upload 
              name="image"
              showUploadList={false}
              beforeUpload={handleUploadFile}
              listType="picture-card"
            >
              {img ? <img src={img} style={{width : '100%'}} /> : uploadButton}
            </Upload>  
          </Form.Item>

          <Button type="primary" block htmlType="submit">
            Sign up
          </Button>
        </Form>
        {/* <Divider>
          Or
        </Divider>
        <a href={googleUrl}>
          <Button block>Sign up with Google</Button>
        </a> */}
      </Col>
    </Row>
    </div>
  </div>
  </div>
  </div>
  )
}

export default Signup
