import React, {useState, useEffect}from 'react'
import { getAllPaths} from '../../services/paths.js'
import { Typography, Button, Modal,  Card, Divider, Skeleton, Progress} from 'antd'
import { Link } from 'react-router-dom'
import { useContextInfo } from '../../hooks/context.js'
import { Input } from 'antd';
import LayoutDash from "../../components/LayoutDash";
import FavPath from "../../components/favorites/FavPath";
import MyCategoriesIcons from '../../components/MyCategoriesIcons.js'

const { Title } = Typography
const { Search } = Input;

export const MyDevOps = () => {

    const { user } = useContextInfo()
    const [pathsy, setPaths] = useState(null)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [changes, setChanges] = useState(false);

    useEffect(() => {
        async function getPaths() {
            const {data} = await getAllPaths()

           //get only users path//
            const userPaths = data.filter((info)=>
            info.users[0]===user._id && info.category === 'Dev Ops'
            )
            setPaths(userPaths)    
            console.log(userPaths)          
        }
        getPaths()
        }, [changes])

        //search paths
        async function onSearch (value) {
            let search= value.target.value
            const {data} = await getAllPaths()
            let allTitles= data.map(info=> info)
            let allPaths= allTitles.filter(info=> info.title.toLowerCase()===search)
            setPaths(allPaths)
            if(value===' '){console.log(pathsy) 
                setPaths(data)}     
        }
    return (
    <LayoutDash>
        <div>
        <MyCategoriesIcons/>

             {/* User´s paths */} 
             {user? (
                <div style={{ padding: '1rem 3rem', display:'flex', flexDirection:'column' }}>
                    <h1 style={{fontFamily:'Verdana', fontSize:'30px'}}><b>Your study paths</b></h1> 
                <div style={{ padding: '1rem 3rem', display:'flex', flexDirection:'column'}}>
                    <div style={{marginTop:'50px'}}>
                    <Search placeholder="What are you looking for?" onChange={onSearch} allowClear style={{ width: 500 }} />                        <br />         
                    </div>
                <div style={{ padding: '1rem', display:'flex', flexDirection:'row', flexWrap: 'wrap'  }}>  

                        {pathsy?.map((path, i ) => (
                        <div style={{borderRadius:' 20px ', margin:'10px',  width:'240px'}}>
                        <Card  hoverable  style={{backgroundColor: 'white', borderRadius:'10px', boxShadow: '3px 4px 25px -7px rgba(0,0,0,0.75)'}} >
                            <Link to={`/path/${path._id}`}>
                                <div >
                                    <Card type="inner" style={{ color:'white', backgroundColor:'#0B648A', borderRadius:'5px'}}>
                                        <Title style={{ color:'white', fontFamily:'arial', fontWeight:'lighter', fontSize:'17px'}} level={2} >{path.title}</Title>
                                    </Card>
                                </div> 
                            </Link>  
                            <Progress  percent={path.progress} size="small" />
                           

                            <Divider>Topics</Divider>
                           
                            {path.topics?.map((topic, index ) => (
                                <>
                                <Link to={`/topic/${topic._id}`}>
                                <Card hoverable  style={{ marginTop:'15px', width:'180px', height:'70px', margin:'0px', padding:'0px', borderColor: '#1F79B5'}}  >
                                        <b><p style={{ margin:'0px', padding:'0px', color:'gray'}}>{topic.title}</p></b>
                                </Card>  
                                </Link>   
                                </>  
                            ))}
                        <FavPath {...path}/> 
                        </Card>
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

export default MyDevOps