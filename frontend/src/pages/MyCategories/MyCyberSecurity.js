import React, {useState, useEffect}from 'react'
import { getAllPaths} from '../../services/paths.js'
import { Collapse, Button,  Empty, Divider, Skeleton, Progress} from 'antd'
import { Link } from 'react-router-dom'
import { useContextInfo } from '../../hooks/context.js'
import { Input } from 'antd';
import LayoutDash from "../../components/LayoutDash";
import FavPath from "../../components/favorites/FavPath";
import MyCategoriesIcons from '../../components/MyCategoriesIcons.js'
import { PlusOutlined } from '@ant-design/icons';

const { Panel } = Collapse;
const { Search } = Input;

export const MyCyberSecurity = (props) => {

    const { user } = useContextInfo()
    const [pathsy, setPaths] = useState(null)
    const [changes, setChanges] = useState(false);
    const [allMyPathsy, setallMyPathsy] = useState(null)

    useEffect(() => {
        async function getPaths() {
            const {data} = await getAllPaths()

           //get only users path//
            const userPaths = data.filter((info)=>
            info.users[0]._id===user._id && info.category === 'Cyber Security'
            )
            setPaths(userPaths)    
            setallMyPathsy(userPaths)
            }
        getPaths()
        }, [changes])

        //search paths
        function onSearch (value, info) {
            const results = pathsy.filter(path => path.title.toLowerCase().includes(value)) 
            if(value===''){
                setPaths(allMyPathsy)
            }else if(!results){
                setPaths(allMyPathsy)
            } else{
                setPaths(results)
            }      
        };

    return (
        <LayoutDash>
            <div>
            <MyCategoriesIcons/>
                {/* User´s paths */} 
                {user? (
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
    
                        <Divider style={{color:'#A6A6A4', fontSize:'20px', marginBottom:'0'}}>Your study paths</Divider>
                        <div style={{ padding: '1rem 3rem', display:'flex', flexDirection:'column', alignContent:'center', alignItems:'center', justifyContent:'center'}}>
    
                        <div style={{ padding: '1em', display:'flex', flexDirection:'row', flexWrap: 'wrap', borderRadius:'20px'}}>  
                        {pathsy?.length === 0?  <Empty />: <></>} 

                            {pathsy?.map((path, i ) => (
                                <div style={{borderRadius:' 20% ', margin:'10px',  width:'840px'}}>
                                        <div style={{ position: 'absolute', color:'#CFCFCF', fontSize:'18px', marginTop:'10px' , padding:'17px 28px 17px 30px', borderRight:'1px solid #BFBEBD'}}>
                                            <FavPath {...path} />
                                        </div>
                                <Link to={`/path/${path._id}`}>
                                <div type="inner" style={{ color:'#EDECEB', backgroundColor:'#f7f7f5', borderRadius:'20px', height:'80px'}}>
    
                                <Progress  percent={path.progress} size="small" style={{ width:'700px', marginBottom:'0', marginLeft:'40px', lineHeight:'0px'}} strokeColor={'#2B9479'}/>
    
                                    <div style={{marginLeft:'105px',  textAlign:'left'}}>
                                        <h2 style={{fontFamily:'arial', color:'#999897', fontSize:'18px', lineHeight:'13px', marginTop:'15px'}}> {path.title}</h2>
                                    </div>
                                </div> 
                                </Link> 
    
                                <Collapse bordered={false} defaultActiveKey={['1']} ghost>
                                <Panel header={<h2 style={{fontFamily:'arial',  color:'#BFBEBD', fontWeight:'lighter', padding:'0px', fontSize:'15px', textAlign:'left'}}> {path.topics.length} topics</h2>}>
    
                                {path.topics?.map((topic, index ) => (
                                    <>
                                    <Link to={`/topic/${topic._id}`}>
                                    <div style={{ marginBottom:'2px', padding:'10px 0px 1px 0px', backgroundColor:'#f7f7f5',textAlign:'left'}}>
                                        <p style={{ marginLeft:'20px', padding:'0px', color:'gray', lineHeight:'10px'}}>{topic.title}</p>
                                    </div>  
                                    </Link>   
                                    </>  
                                ))}          
                                </Panel>
                                </Collapse>
                            </div>      
                            ))}
                        </div>
                
                    </div>
                    
                </div>
                ):( 
                    <Skeleton active />
                )}
                
            </div>
            </LayoutDash>
    )
}

export default MyCyberSecurity