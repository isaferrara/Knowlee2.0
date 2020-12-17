import React, { useState } from 'react'
import { Layout, Menu, Row, Col, Form, Input, Button, Typography, Divider, Upload } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {PasswordInput} from 'antd-password-input-strength'
import { signupFn } from '../services/auth'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useContextInfo } from '../hooks/context'


const { Title } = Typography
const { Header} = Layout;

const cloudinaryAPI = 'https://api.cloudinary.com/v1_1/djjro5m0g/image/upload' 

const googleUrl = process.env.NODE_ENV === 'development' ?
  "http://localhost:3000/auth/google" : '/auth/google'

const Signup = ({ history }) => {
  const [form] = Form.useForm()
  const [img, setImg] = useState(null)
  const [loading, setLoading] = useState(null)
  const { user} = useContextInfo()


  async function handleSubmit(userInput) {
    const usr = {...userInput, image: img}

    const {data} = await signupFn(usr)
    history.push('/')
  }

  const onReset = () => {
    form.resetFields();
  };

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
        <Title level={1} style={{ padding:'0'}}>Signup</Title>
      </Col>
      <Divider />
      <Col span={24}>
        <Form layout="vertical" form={form} onFinish={handleSubmit}>

          <Form.Item name='username' label="Username:" rules={[{ 
            required: true, message: 'Please input your username!' }]}>
            <Input />
          </Form.Item>


          <Form.Item name='email' label="Email:" rules={[{ required: true, message: 'Please input your password!' }]} >
            <Input />
          </Form.Item>

          <Form.Item name='password' label="Password:" rules={[{ required: true, message: 'Please input your password!' }]} hasFeedback>
            <PasswordInput />
          </Form.Item>

          <Form.Item name='image' label="Image:">
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
            Signup
          </Button>

          <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
        </Form>
        <Divider>
          Or
        </Divider>
        <a href={googleUrl}>
          <Button block>Sign up with Google</Button>
        </a>
      </Col>
    </Row>
    </div>
  </div>
  </div>
  </div>
  )
}

export default Signup
