import React, {useState, useEffect} from 'react'
import { useContextInfo } from '../hooks/context'
import { getSinglePath, deletePath } from '../services/paths.js'
import {  deleteTopic, createTopic} from '../services/topics.js'
import { Popconfirm, Skeleton, Divider, Card, Button, Modal, Form, Input, Progress} from 'antd'
import EditPath from '../components/EditPath'
import PathInfo from '../components/PathInfo'
import { Link } from 'react-router-dom'
import LayoutDash from "../components/LayoutDash";
import { updatePath } from '../services/paths'
import { PlusOutlined, QuestionCircleOutlined} from '@ant-design/icons';


const DetailsPath = ({ match: { params: { id } }, history } ) => {
    const [form] = Form.useForm()
    const [pathsy, setPaths] = useState(null)
    const [showEditForm, setShowEditForm] = useState(false)
    const [showInfo, setShowInfo] = useState(true)
    const [changes, setChanges] = useState(false)
    const { user } = useContextInfo()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [status, setStatus] = useState(0);
    const [counter, setCounter] = useState(0);
    const [Zero, setZero] = useState(false);
    let percentage;
    let cero=0;


    useEffect(() => {
        async function getPaths() {
             const {data} = await getSinglePath(id)
             setPaths(data) 

            if(cero===0){
            const {data: setToZero } = await updatePath (id, 
                    {
                        title: data.title,
                        description: data.description,
                        shortDesc: data.shortDesc,
                        isFav: data.isFav,
                        progress: 0,
                        level: data.level,
                        category: data.category,
                        topics: data.topics,
                        users: data.users
                        })  
       
                }

            }
            getPaths()                          



        }, [changes])

        async function handleDelete() {
            await deletePath(id)
            history.push(`/dash/${user._id}`)
        }
            
        async function delTopic(id) {
            await deleteTopic(id)
            setChanges(!changes)
            
            history.push(`/path/${pathsy._id}`)
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
                progress: status.progress,
                content:value.content,
                pathId:pathsy._id
                })
            setIsModalVisible(false);
            form.resetFields()
            setChanges(!changes)
        
    }

    let count=0;

    
     const countDone=  ()=>{
         
        count++
        percentage= Math.floor((count/ pathsy.topics.length)*100)


       const updateProgressPath= async ()=>{  
       const {data} = await getSinglePath(id)     

       for( let i=0; i<data.topics.length; i++ ){

       const {data: upData}=await updatePath (id, 
        {
         title: data.title,
         description: data.description,
         shortDesc: data.shortDesc,
         isFav: data.isFav,
         progress: percentage,
         level: data.level,
         category: data.category,
         topics: data.topics,
         users: data.users
        })
         setCounter(upData.progress)
        } 
    }
    updateProgressPath()
    }




    return (
        <LayoutDash>
        <div style={{ padding: '1rem 3rem', backgroundColor:'white', borderRadius:'10px'}}>
        <div style={{position:'absolute', marginLeft:'760px', marginTop:'20px'}}>
        {showInfo?
            <Popconfirm title="Are you sure？" onConfirm={handleDelete} icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
                <Button type="ghost" danger >Delete</Button>
            </Popconfirm>:<></>}
            </div>
        <div style={{position:'absolute', marginTop:'50px', marginLeft:'700px'}}>
            {/* mide el progreso que es el promedio de cuantos topics se han completado */}
            {showInfo?<Progress style={{marginTop:'20px', }}  type="circle" percent={counter} format={percent => `${percent}%`} width={120}/>: <></> }
        </div>

            {pathsy? (<div>
                {showInfo && <PathInfo {...pathsy} setForms={setForms} /> }
                <br />
                {showEditForm && <EditPath {...pathsy} setForms={setForms}/>}

        <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
         <Divider>Topics</Divider>
        {/* create new path botton */}
       
            <Button primary onClick={showModal} style={{fontSize:'17px', color:'white', backgroundColor:'#E05872', borderRadius:'6px', width:'170px', height:'40px', display:'flex', flexDirection:'row',  alignItems:'center', alignContent:'center'}} type='ghost'>
                <b>Add Topic</b> 
                <div style={{backgroundColor:'#C74E64', marginLeft:'29px', borderRadius:'6px', padding:'5px 14px 5px 14px'}}>
                <PlusOutlined />
                </div>
            </Button>
          <br />
    <div style={{marginTop: '40px'}}>
    

    {pathsy.topics.map((topic, i) => 
    <div>
        <div style={{position: 'absolute', marginTop: '45px', marginLeft:'760px'}}>
            <Popconfirm title="Are you sure？" onConfirm={()=>delTopic(topic._id)} icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>               
            <Button type="ghost" danger >Delete</Button> 
            </Popconfirm>
            </div>
        <Link to={`/topic/${topic._id}`}> 
        { topic.progress? <Progress  percent={100} width={40} strokeWidth={3} strokeColor={'#2B9479'}/> : <></>}
        {topic.progress ? countDone(): <div style={{display:'none'}}>{cero=+1}</div>}   
       
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', backgroundColor:'#f7f7f5', borderRadius:'15px', marginBottom:'10px', width:'900px'}}>  

        <div style={{display:'flex', flexDirection:'column', textAlign:'left', marginLeft: '40px', padding: '10px'}}>

        <p style={{marginBottom:'1px', marginTop:'5px', color:'gray'}} > 
            {topic.title}</p>{'   '}
            <small style={{marginBottom:'10px', marginTop:'5px', color:'gray', lineHeight:'10px'}}>
            <b>Objective:</b> {'   '}
                {topic.objective}</small>
            <small style={{marginBottom:'10px', paddingLeft:'0px', color:'gray', lineHeight:'10px'}}>
            <b>Duration:</b>{'   '}
            {topic.duration}</small>
            </div>

        </div>
    </Link>
    </div>
    )}
    </div>
</div>
    {/* modal to add new topics  */} 

        <Modal
         footer={null}
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
        <Button type="primary" htmlType='submit' block >Add topic</Button>
            
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