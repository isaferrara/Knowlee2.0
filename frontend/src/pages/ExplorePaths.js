import React, {useState, useEffect}from 'react'
import { getAllPaths, updatePath} from '../services/paths.js'
import { Checkbox, Button, Modal, Form,  Card, Divider, Skeleton} from 'antd'
import { Link } from 'react-router-dom'
import { useContextInfo } from '../hooks/context.js'
import { Input } from 'antd';
import { createTopic } from '../services/topics.js'
import LayoutDash from "../components/LayoutDash";
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
            data.filter((info)=>
            info.users[0]===user._id
        )
            setOtherPaths(data)
            setPaths(data)
            setallMyPathsy(data)

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
             {otherPaths?
                (
                    <div style={{borderRadius:' 20px ', margin:'10px', marginRight:'20px'}}>
                    <h1 style={{fontFamily:'Verdana', fontSize:'30px', paddingTop: '50px'}}><b>Find the best study paths</b></h1> 
                    {/* searchbar */}
                    <Search placeholder="What are you looking for?" onSearch={onSearch} allowClear style={{ width: 500 }} />                        <br />         

                    <div style={{ display:'flex', flexDirection:'row', flexWrap: 'wrap' , justifyContent:'center' }}>    
                
                        {/* shoose any topic to add to own paths */} 
                        <div style={{ display:'flex', flexDirection:'row', flexWrap: 'wrap' , justifyContent:'center' }}>    
                        <Form  onFinish={onFinish}>
                        {selected? <Button type="primary" style={{marginTop:'30px'}} onClick={showModal} htmlType="submit" > Add to my paths  </Button>:<Button type="primary" style={{marginTop:'30px'}} disabled> Select topics to add   </Button>
 }
                        <div style={{ padding: '1rem', display:'flex', flexDirection:'row'  }} >

                        <Form.Item name="checkbox-group">
                            {/* show only paths that interest user*/} 
                            <Checkbox.Group > 
                                {otherPaths?.map(path => (
                                    <div style={{ padding: '1rem', display:'flex', flexDirection:'column'  }} >
                                    <Card hoverable  style={{backgroundColor: 'white', borderRadius:'10px', boxShadow: '3px 4px 25px -7px rgba(0,0,0,0.75)', width:'460px'}} >
                                    <Card type="inner" style={{ color:'white', backgroundColor:'#0B648A', borderRadius:'5px'}}>
                                        <Link to={`/path/explore/${path._id}`}> <h1 style={{ color:'white'}} >{path.title}</h1> </Link> 
                                    </Card>
                                    <Divider>Topics</Divider>
                                    <div style={{ padding: '1rem', display:'flex', flexDirection:'column', width:'450px' }} >
                                            {path.topics?.map((topic, index) => (
                                                <div style={{  display:'flex', flexDirection:'row', width:'450px' }} >
                                                <Card hoverable  style={{  width:'380px', height:'70px', margin:'0px', padding:'0px', borderColor: '#1F79B5',  display:'flex', flexDirection:'row' }}  >
                                                    <Checkbox value={topic}  onChange={activate}  >
                                                    <Link to={`/topicdetails/${topic._id}`}>
                                                    {topic.title}
                                                    </Link>
                                                    </Checkbox>
                                                </Card> 
                                                </div>
                                            ))}
                                    </div>
                                    </Card>    
                                    </div>   
                                    ))}
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
                    
                </div>
                ):( 
                    <Skeleton active />
                )}
                
           
        </LayoutDash>
        </div>

        )
    }
export default ExplorePaths
