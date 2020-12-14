import React, {useState, useEffect} from 'react'
import { useContextInfo } from '../hooks/context'
import { getSinglePath, deletePath } from '../services/paths.js'
import {  deleteTopic, createTopic} from '../services/topics.js'
import { Skeleton, Divider, Card, Button, Modal, Form, Input, Space} from 'antd'
import EditPath from '../components/EditPath'
import PathInfo from '../components/PathInfo'
import { Link } from 'react-router-dom'
import LayoutDash from "../components/LayoutDash";


const DetailsPath = ({ match: { params: { id } }, history }) => {
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

        async function handleDelete() {
            await deletePath(id)
            history.push(`/dash/${user._id}`)
        }
            

        function sum(i) {
            i++
        }

        function setForms(){
            setShowEditForm(!showEditForm)
            setShowInfo(!showInfo)
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
        <LayoutDash>
        <div style={{ padding: '1rem 3rem' }}>
            {pathsy? (<div>
                {showInfo && <PathInfo {...pathsy} setForms={setForms} /> }
                <br />
        {showEditForm && <EditPath {...pathsy} setForms={setForms}/>}

    <Divider>Topics</Divider>
    <Button type="primary" onClick={showModal} block >Add Topic</Button>
    <br />
    <div style={{marginTop: '40px',}}>
    {pathsy.topics.map((topic, i) => 
        <Link to={`/topic/${topic._id}`}> 
    <Card hoverable
     number={sum(i)} title={ (i+1) + '     ' + topic.title  } style={{marginBottom:'10px'}} >
    <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>  
 

        <div style={{display:'flex', flexDirection:'column', textAlign:'left',  marginLeft: '40px', padding: '20px'}}>

        <div><b>Objective</b> <p>  {topic.objective}</p></div>
    
       <div><b>Duration</b> <p>  {topic.duration}</p></div> 
        
        </div>

            <div style={{marginTop: '60px'}}>
            <Button type="ghost" danger onClick={ async ()=> {
                await deleteTopic(topic._id)
                setChanges(!changes)}}>Delete</Button> 
            </div>
        </div>
    </Card>
    </Link>
    )}
    </div>
    <Divider></Divider>
    <Button type="ghost" onClick={handleDelete} danger block >Delete Path</Button>
    
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

export default DetailsPath