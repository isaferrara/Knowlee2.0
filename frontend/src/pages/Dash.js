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
import { PlusOutlined } from '@ant-design/icons';

const { Title } = Typography
const { Search } = Input;

const Dash = (props) => {
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

            console.log(Pathsy)
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
            <h1> Dashboard </h1>

             {/* User´s paths */} 
            <SuscribersPaths/>
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

                <Divider style={{color:'#A6A6A4', fontSize:'20px'}}>Your study path</Divider>
                <div style={{ padding: '1rem 3rem', display:'flex', flexDirection:'column', alignContent:'center', alignItems:'center', justifyContent:'center'}}>

                <div style={{ padding: '1rem', display:'flex', flexDirection:'row', flexWrap: 'wrap', borderRadius:'20px'}}>  
   
                        {/* sacas todos tus paths */}
                        {pathsy?.map((path, i ) => (
                        <div style={{borderRadius:' 20% ', margin:'10px',  width:'840px'}}>
                            <Link to={`/path/${path._id}`}>
                                <div type="inner" style={{ color:'#EDECEB', backgroundColor:'#EDECEB', borderRadius:'20px'}}>
                                <Progress  percent={path.progress} size="small" style={{ width:'800px', marginBottom:'0', lineHeight:'0px'}} strokeColor={'#E05872'}/>
                                        <h2 style={{ color:'white', fontFamily:'arial', fontWeight:'lighter', fontSize:'17px'}}> {path.title}</h2>
                                        <h2 style={{ color:'white', fontFamily:'arial', fontWeight:'lighter', fontSize:'17px'}}> {path.topics.length} topics</h2>
                                </div> 
                            </Link>  
                              
                            <FavPath {...path} style={{zIndex:'0'}}/>
 
                        </div>      
                        ))}
                    
                    </div>
                </div>
                
            </div>
            ):( 
                <h1>No Results Found</h1>
            )}
            
        </div>
        <CategoriesIcons/>
        </LayoutDash>
        )
    }
export default Dash