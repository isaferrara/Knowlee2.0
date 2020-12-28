import React, {useState, useEffect}from 'react'
import { getAllPaths} from '../services/paths.js'
import { Collapse, Progress, Checkbox, Button, Modal, Form, Divider, Skeleton} from 'antd'
import { Link } from 'react-router-dom'
import { useContextInfo } from '../hooks/context.js'
import { Input } from 'antd';
import { createTopic } from '../services/topics.js'
import LayoutDash from "../components/LayoutDash";
import CategoriesIcons from "../components/CategoriesIcons";
import { PlusOutlined } from '@ant-design/icons';
import SuscribeExplore from '../components/Suscribe/SuscribeExplore.js'
import FavPath from "../components/favorites/FavPath";

const { Panel } = Collapse;
const { Search } = Input;

const ExplorePaths = () => {
    const { user } = useContextInfo()
    //user´s paths
    const [pathsy, setPaths] = useState(null)
    //recommended paths
    const [otherPaths, setOtherPaths] = useState(null)
    const [selectedTopics, setSelectedTopics] = useState(null)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [changes, setChanges] = useState(false);
    const [selected, setSelected] = useState(false);
    const [selectedPath, setSelectedPath] = useState(false);
    const [allMyPathsy, setallMyPathsy] = useState(null)

    useEffect(() => {
        async function getPaths() {
            const {data} = await getAllPaths()
            //get recommended paths--users starts with all existing paths//
            let allOther=data.filter((info)=>
            info.users[0]._id !==user._id
        )

            let myPaths=data.filter((info)=>
            info.users[0]._id ===user._id
        )
            setOtherPaths(allOther)
            setPaths(myPaths)
            setallMyPathsy(allOther)

        }
        getPaths()
        }, [changes])



        //on submit all the selected topics user is adding to paths
        const onFinish = values => {
                let copy = {...values}
                setSelectedTopics(copy)
        } 

        //search recommended paths
        function onSearch (value) {
            const results = otherPaths.filter(path => path.title.toLowerCase().includes(value)) 
            if(value===''){
                setOtherPaths(allMyPathsy)
            }else if(!results){
                setOtherPaths(allMyPathsy)
            } else{
                setOtherPaths(results)
            }      
        };

         //show modal to transfer topics 
        const showModal = () => {
            setIsModalVisible(true);
          };

          function activate(value){
              value.target.checked? setSelected(true) : setSelected(false)
          }

          function activatePath(value){
            value.target.checked? setSelectedPath(true) : setSelectedPath(false)
        }

          //on submit transfer topics to users paths
        const handleOk = (values) => {
            setIsModalVisible(false);
          
 
   

            async function getPaths() {
                //Check every path 
                let allPathsy=[]
            for(let i=0; i< values['checkbox-group'].length; i++){

                //Id of all selected paths
                let idPath= values['checkbox-group'][i]._id
                allPathsy.push(values['checkbox-group'][i])
                

                // all selected topics
                for(let i=0; i<selectedTopics['checkbox-group'].length; i++  ){             
                    let {data}=await createTopic({  
                        title:selectedTopics['checkbox-group'][i].title ,
                        objective:selectedTopics['checkbox-group'][i].objective ,
                        duration:selectedTopics['checkbox-group'][i].duration ,
                        content:selectedTopics['checkbox-group'][i].content , 
                        pathId: allPathsy
                    })
                        setChanges(true)

                    }
                }
               
            }
            getPaths()

    }
        const handleCancel = () => {
            setIsModalVisible(false);
        }
        return (
            <div style={{  display:'flex', flexDirection:'column', justifyContent:'content',  width:'100%',  height:'100%', alignContent:'center'}}>

            <LayoutDash style={{paddingRight:'0px'}}>
            <CategoriesIcons />
            <SuscribeExplore/>

             {otherPaths?
                (

                <div style={{ padding: '1rem 3rem', display:'flex', flexDirection:'column', justifyContent:'center', borderRadius:'20px', backgroundColor:'white', marginTop:'70px', boxShadow: '-1px 0px 19px -1px rgba(125,125,125,0.39)' }}>
                <div style={{display:'flex', flexDirection:'row',  justifyContent:'space-around', marginTop:'20px'}} >
                    
                    {/* search bar */}
                    <Search allowClear placeholder="What are you looking for?" onSearch={onSearch} allowClear style={{ width: '600px', borderRadius:'3px', marginBottom: '20px', marginTop:'5px'}} />                       

                    {/* create new path botton */}
                    <Link to={'/path/create'} >
                        <Button style={{fontSize:'17px', color:'white', backgroundColor:'#E05872', borderRadius:'6px', width:'210px', height:'40px', display:'flex', flexDirection:'row',  alignItems:'center', alignContent:'center'}} type='ghost'>
                            <b>Create new path </b> 
                            <div style={{backgroundColor:'#C74E64', marginLeft:'13px', borderRadius:'6px', padding:'5px 14px 5px 14px'}}>
                            <PlusOutlined />
                            </div>
                            </Button>
                    </Link> 
                    </div>

                    <Divider style={{color:'#A6A6A4', fontSize:'20px', marginBottom:'0'}}>Explore study paths</Divider>

                    <div style={{ padding: '1rem 3rem', display:'flex', flexDirection:'column', alignContent:'center', alignItems:'center', justifyContent:'center'}}>
                    <div style={{ padding: '1em', display:'flex', flexDirection:'row', flexWrap: 'wrap', borderRadius:'20px'}}>  

                        {/* shoose any topic to add to own paths */} 
                        <div style={{ display:'flex', flexDirection:'row', flexWrap: 'wrap' , justifyContent:'center' }}>    
                        <Form  onFinish={onFinish}>
                        {selected? <Button type="primary" style={{marginTop:'30px'}} onClick={showModal} htmlType="submit" > Add to my paths  </Button>:<Button type="primary" style={{marginTop:'30px'}} disabled> Select topics to add   </Button>}
                        <div style={{ padding: '1rem', display:'flex', flexDirection:'row'  }} >

                        <Form.Item name="checkbox-group">
                            {/* show only paths that interest user*/} 
                            <Checkbox.Group > 
                              
                                {otherPaths?.length>10? setOtherPaths(otherPaths.slice(-10)): 
                                    <>
                                {otherPaths?.map(path => (
                                    <div style={{borderRadius:' 20% ', margin:'10px',  width:'840px'}}>
                                        <div style={{ position: 'absolute', color:'#CFCFCF', fontSize:'18px', marginTop:'10px' , padding:'17px 28px 17px 30px', borderRight:'1px solid #BFBEBD'}}>
                                            <FavPath {...path} />
                                        </div>
                                        <Link to={`/path/explore/${path._id}`}>
                                        <div type="inner" style={{ color:'#EDECEB', backgroundColor:'#f7f7f5', borderRadius:'20px', height:'80px'}}>
                                        <Progress  percent={path.progress} size="small" style={{ width:'700px', marginBottom:'0', marginLeft:'40px', lineHeight:'0px'}} strokeColor={'#2B9479'}/>

                                        <div style={{marginLeft:'105px',  textAlign:'left'}}>
                                            <h2 style={{fontFamily:'arial', color:'#999897', fontSize:'18px', lineHeight:'13px', marginTop:'15px'}}> {path.title}</h2>
                                        </div>
                                        </div>                                               
                                    </Link> 

                                    <Collapse bordered={false} defaultActiveKey={['1']} ghost>
                                    <Panel header={<h2 style={{fontFamily:'arial',  color:'#BFBEBD', fontWeight:'lighter', padding:'0px', fontSize:'15px', textAlign:'left'}}> {path.topics.length} topics</h2>}>
                                        
                                            {path.topics?.map((topic, index) => (
                                                <>
                                                    <Checkbox value={topic}  onChange={activate} style={{ marginLeft:'25px', padding:'2px', marginBottom:'4px',  backgroundColor:'#f7f7f5',textAlign:'left', display:'flex', flexDirection:'row', alignItems:'center' }} >
                                                    <Link to={`/topicdetails/${topic._id}`}>
                                                    <div style={{ marginLeft:'5px',  padding:'10px 0px 0px 0px', backgroundColor:'#f7f7f5',textAlign:'left', display:'flex', flexDirection:'column'}}>
                                                        <p style={{ marginLeft:'20px', marginBottom:'10px', padding:'0px', color:'gray', lineHeight:'10px'}}>{topic.title}</p>
                                                    </div>  
                                                    </Link>
                                                    </Checkbox>
                                                </>  
                                        
                                            ))}
                                            </Panel>
                                        </Collapse>
                                    </div>
                                    ))}
                                    
                                    </>
                                }
                                     </Checkbox.Group>
                                    </Form.Item>
                                    </div>
                            </Form>
                            
                            {/* modal to select the path to add new topics to */} 
                            <Modal
                               footer={null}
                                title="Add topic to your paths"
                                visible={isModalVisible}
                                onCancel={handleCancel}

                            >
                        <div > 
                        <Form  onFinish={handleOk} style={{  display:'flex', flexDirection:'column' }}>
                            <Form.Item name="checkbox-group">
                            <Checkbox.Group style={{ display:'flex', flexDirection:'column' }}> 
                                {pathsy?.map(path => (
                                <div style={{ display:'flex', flexDirection:'row', border:'	#DCDCDC solid 1px', marginTop:'10px'}}>
                                    <Checkbox  value={path} onChange={activatePath} style={{ display:'flex', flexDirection:'row', alignItems:'center', margin:'3px 0 0 10px'}}>
                                        <h3>{path.title}</h3> 
                                    </Checkbox>
                                </div>        
                                ))}
                            </Checkbox.Group>
                            </Form.Item>
                            {selectedPath? <Button type="primary"  htmlType="submit" > Add to my paths  </Button> : <Button style={{marginTop:'30px'}} disabled>Select topics to add</Button>}
                            </Form>
                            </div>
                            </Modal>
                        </div>

                    </div>
                   
                    <Link to={`/all-paths/${user._id}`}  className='seeMore'> Show more </Link>

                    </div>
                </div>
                ):( 
                    <Skeleton active />
                )}
                
               
         </LayoutDash>
        </div>

        )
    }
export default ExplorePaths
