import React, {useState, useEffect}from 'react'
import { getAllPaths} from '../services/paths.js'
import { Typography, Button, Modal,  Card, Divider, Skeleton, Progress} from 'antd'
import { Link } from 'react-router-dom'
import { useContextInfo } from '../hooks/context.js'
import { Input } from 'antd';

import LayoutDash from "../components/LayoutDash";
import FavPath from "../components/favorites/FavPath";
import CategoriesIcons from "../components/CategoriesIcons";
import SuscribersPaths from '../components/DashComponents/SuscribersPaths.js'


const { Title } = Typography
const { Search } = Input;

const Dash = () => {
    const { user } = useContextInfo()
    //user´s paths
    const [pathsy, setPaths] = useState(null)
    const [allMyPathsy, setallMyPathsy] = useState(null)
    const [changes, setChanges] = useState(false);
    const [info, setInfo]= useState(null)

    useEffect(() => {
        async function getPaths() {
            const {data} = await getAllPaths()
            //get only users path//
            const Pathsy = data.filter((info)=>
            info.users[0]._id===user._id)

            // // //users paths edit
            setPaths(Pathsy) 

             //users paths always complete
            setallMyPathsy(Pathsy)
        }
        getPaths()


        }, [changes])

        //search recommended paths
        function onSearch (value) {
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
             {/* User´s paths */} 
             <SuscribersPaths/>
             <CategoriesIcons/>
             {user? (
                <div style={{ padding: '1rem 3rem', display:'flex', flexDirection:'column' }}>
                    <h1 style={{fontFamily:'Verdana', fontSize:'30px'}}><b>Your study paths</b></h1> 
                <div style={{ padding: '1rem 3rem', display:'flex', flexDirection:'column'}}>
                <Button type='primary' ><Link to={'/path/create'}  style={{fontFamily:'Arial', fontSize:'20px', color:'white', createBottom: '10px'}}> <b>Create new path </b> </Link> </Button>
                    <div style={{marginTop:'50px'}}>
                    <Search placeholder="What are you looking for?" onSearch={onSearch} allowClear style={{ width: 500 }} />                       
                     <br />         
                    </div>
                <div style={{ padding: '1rem', display:'flex', flexDirection:'row', flexWrap: 'wrap'  }}>  

                        {/* sacas todos tus paths */}
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
                <h1>No Results Found</h1>
            )}
            
        </div>
        </LayoutDash>
        )
    }
export default Dash