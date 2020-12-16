import React, {useState, useEffect} from 'react'
import { useContextInfo } from '../hooks/context'
import { getSinglePath, deletePath } from '../services/paths.js'
import {  deleteTopic, createTopic} from '../services/topics.js'
import { Input, Typography, Skeleton, Divider, Card, Button, Modal, Form, Inputtle} from 'antd'
import { Link } from 'react-router-dom'
import LayoutDash from "../components/LayoutDash";


const { Title } = Typography
const DetailsExplorePath = ({ match: { params: { id } }, history }) => {
    const [form] = Form.useForm()
    const [pathsy, setPaths] = useState(null)
    const [showEditForm, setShowEditForm] = useState(false)
    const [showInfo, setShowInfo] = useState(true)
    const [changes, setChanges] = useState(false)
    const { user } = useContextInfo()
    const [isModalVisible, setIsModalVisible] = useState(false);
    useEffect(() => {
    async function getPaths() {
        const {data} = await getSinglePath(id)
        setPaths(data) 
    }
    getPaths()
    }, [changes])
 function sum(i) {
    i++
 }
const showModal = () => {
    setIsModalVisible(true);
    }
const handleCancel = () => {
    setIsModalVisible(false);
}
const createNewTopic= async (value)=>{
    const {data: newTopic}= await createTopic(
        {title:value.title,
        objective: value.objective,
        duration: value.duration,
        content:value.content,
        pathId:pathsy._id
        })
        setIsModalVisible(false);
        form.resetFields()
        setChanges(!changes)
} 
    return (
        //solo ver no editar
    <LayoutDash>
        <div style={{ padding: '1rem 3rem' }}>

        {pathsy? (<div>
            <Title level={2}>{pathsy.title}</Title>
        <div style={{textAlign:'left'}}> 
            <p><b>Description:</b>{pathsy.description}</p>
            <p> <b>Category:</b>{pathsy.category}</p>
        </div>
    <Divider>Topics</Divider>
    <br />

    {pathsy.topics.map((topic, i) => 
        <Link to={`/topicdetails/${topic._id}`}> 
    <Card hoverable
     number={sum(i)} title={ (i+1) + '     ' + topic.title  } style={{marginBottom:'10px'}} >
    <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>  
        <div style={{display:'flex', flexDirection:'column', textAlign:'left', marginLeft: '40px', padding: '20px'}}>
        <p style={{marginBottom:'3px', marginTop:'5px'}} > 
        <b>Objective:</b> 
            {topic.objective}</p>
            <p style={{marginBottom:'3px', paddingLeft:'0px'}} > 
        <b>Duration:</b>
        {topic.duration}</p>

            </div>
        </div>
    </Card>
    </Link>
    )}
    <Divider></Divider>
    {/* modal to add new topics  */} 
        <Modal
        title="Add topic"
        visible={isModalVisible}
        onCancel={handleCancel}
        okText="Add"
        cancelText="cancel"
        >
            <Form onFinish={createNewTopic} form={form}>
        <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Missing title' }]}>
            <Input placeholder="Title" />
        </Form.Item>
        <Form.Item name="objective" label="Objective" rules={[{ required: true, message: 'Missing objective' }]}>
            <Input.TextArea placeholder="Objective" />
        </Form.Item>
        <Form.Item name="duration" label="Duration" rules={[{ required: true, message: 'Missing duration' }]}>
            <Input placeholder="Estimated duration " />
        </Form.Item>
        <Form.Item name="content" hidden/>
        <Button type="ghost" htmlType='submit' block >Add topic</Button>
        </Form>
            </Modal>
    </div>
    ) : (
          <Skeleton active />
        )}
    </div>
    </LayoutDash> 
    )
}
export default DetailsExplorePath;