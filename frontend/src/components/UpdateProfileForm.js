import React from 'react'
import {useState} from 'react'
import { Form, Input, Button, Upload } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { updateFn } from '../services/auth'
import axios from 'axios'
import { useContextInfo } from '../hooks/context.js'

const cloudinaryAPI = 'https://api.cloudinary.com/v1_1/djjro5m0g/image/upload' 

function UpdateProfileForm({
    username,
    email,
    _id, image
    }) {
    const [form] = Form.useForm()
    //const [user, setUser] = useState()
    const { user } = useContextInfo()
    const [img, setImg] = useState(null)
    const [infoUser, setInfoUser] = useState(user)

    const [loading, setLoading] = useState(null)
    const [disable, setDisable] = useState(true)

    async function handleSubmit(value) {
        const {data: newUpdatedUsr} = await updateFn(_id, {
            username: value.username, 
            email: value.email, 
            image: img, 
            suscribers: user.suscribers,
            paths:user.paths, 
            suscriptions: user.suscriptions, 
            favorites: user.favorites
        })
        setInfoUser(newUpdatedUsr)

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

    function disabled(){
        setDisable(!disable)

    }

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <Form form={form} style={{marginLeft:'150px', width: '350px'}} layout="vertical" onFinish={handleSubmit} initialValues={{
        username: infoUser.username,
        email: infoUser.email, 
        image: infoUser.image
        }}>
        <Form.Item name="username" label="Username:">
            <Input disabled={disable} />
        </Form.Item>
        <Form.Item name="email" label="Email:">
            <Input disabled={disable}/>
        </Form.Item>
        <Form.Item name='image' label="Image:" valuePropName="fileList">
            <Upload 
                name="image"
                showUploadList={false}
                beforeUpload={handleUploadFile}
                listType="picture-card"
                >
                {img ? <img src={img} style={{width : '100%'}} /> : uploadButton}
            </Upload>  
        </Form.Item>
       {disable? <Button  type="primary"  onClick={disabled}>
            Edit profile
        </Button> :
        <Button  type="primary" htmlType="submit" onClick={disabled}>
            Submit
        </Button> } 
        </Form>
    )
}

export default UpdateProfileForm