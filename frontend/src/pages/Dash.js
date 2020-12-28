import React, {useState, useEffect}from 'react'
import { getAllPaths} from '../services/paths.js'
import { Typography, Button, Empty, Divider, Progress} from 'antd'
import { Link } from 'react-router-dom'
import { useContextInfo } from '../hooks/context.js'
import { Input } from 'antd';

import LayoutDash from "../components/LayoutDash";
import FavPath from "../components/favorites/FavPath";
import MyCategoriesIcons from "../components/MyCategoriesIcons";
import SuscribersPaths from '../components/DashComponents/SuscribersPaths.js'
import { PlusOutlined } from '@ant-design/icons';

const { Search } = Input;

const Dash = () => {
    const { user } = useContextInfo()
    //user´s paths
    const [pathsy, setPaths] = useState(null)
    const [allMyPathsy, setallMyPathsy] = useState(null)
    const [changes, setChanges] = useState(false);


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
            <h1> Dashboard </h1>
             {/* User´s paths */} 
            <MyCategoriesIcons/>

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

                <Divider style={{color:'#A6A6A4', fontSize:'20px', marginBottom:'0'}}>Your study path</Divider>
                <div style={{ padding: '1rem 3rem', display:'flex', flexDirection:'column', alignContent:'center', alignItems:'center', justifyContent:'center'}}>

                <div style={{ padding: '1em', display:'flex', flexDirection:'row', flexWrap: 'wrap', borderRadius:'20px'}}>  
   
                        {/* sacas solo 5 de tus paths */}
                        {pathsy?.length>5? setPaths(pathsy.slice(-5)): 
                        <>
                        {pathsy?.length === 0?  <Empty />: <></>} 

                        {pathsy?.map((path, i ) => (
                        <div style={{borderRadius:' 20% ', margin:'10px',  width:'840px'}}>

                                <div type="inner" style={{ color:'#EDECEB', backgroundColor:'#f7f7f5', borderRadius:'20px', height:'80px'}}>
                                <div style={{ position: 'absolute', color:'#CFCFCF', fontSize:'18px', marginTop:'10px' , padding:'17px 28px 17px 30px', borderRight:'1px solid #BFBEBD'}}>
                                    <FavPath {...path} />
                                    <div style={{ position: 'absolute', color:'black',  marginLeft:'50px', marginTop:'50px', height: '300px'}}/>
                                </div>
                                <Progress  percent={path.progress} size="small" style={{ width:'700px', marginBottom:'0', marginLeft:'40px', lineHeight:'0px'}} strokeColor={'#2B9479'}/>
                                <Link to={`/path/${path._id}`}>
                                        <div style={{marginLeft:'105px',  textAlign:'left'}}>
                                            <h2 style={{fontFamily:'arial', color:'#999897', fontSize:'18px', lineHeight:'13px', marginTop:'7px'}}> {path.title}</h2>
                                            <h2 style={{fontFamily:'arial',  color:'#BFBEBD', fontWeight:'lighter', fontSize:'15px', lineHeight:'8px'}}> {path.topics.length} topics</h2>
                                        </div>
                                </Link>   
                                </div> 
                        </div>   
                           
                        ))}
                        </>
                        }
                    </div>
                    {user?.paths.length > 5? <Link to={`/my-paths/${user._id}`}  className='seeMore'> Show more </Link> : <></>} 

                </div>

            </div>
            ):( 
                <h1>No Results Found</h1>
            )}
            <SuscribersPaths />
            {user?.suscriptions>5 ?
             <div style={{marginTop:'50px'}}>
              <Link to={'/subs'}   className='seeMore'> Show more </Link>
            </div>:<></>
             }

        </div>

        </LayoutDash>
        )
    }
export default Dash