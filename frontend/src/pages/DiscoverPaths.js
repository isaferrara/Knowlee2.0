import React, {useState, useEffect}from 'react'
import { getAllPaths} from '../services/paths.js'
import { Button, Typography, Form,  Card, Divider, Skeleton} from 'antd'
import { Link } from 'react-router-dom'
import { useContextInfo } from '../hooks/context.js'
import { Input } from 'antd';
import LayoutApp from "../components/LayoutApp";
const { Search } = Input;
const { Title } = Typography


const DiscoverPaths = () => {
    //recommended paths
    const [otherPaths, setOtherPaths] = useState(null)
    const [selectedTopics, setSelectedTopics] = useState(null)
    const [changes, setChanges] = useState(false);

    useEffect(() => {
        async function getPaths() {
            const {data} = await getAllPaths()
            //get recommended paths--users starts with all existing paths//
            setOtherPaths(data)

        }
        getPaths()
        }, [changes])



        //on submit all the selected topics user is adding to paths
        const onFinish = values => {
                let copy = {...values}
                setSelectedTopics(copy)
        } 

        //search recommended paths
        async function onSearch (value) {
            let search= value.target.value
            const {data} = await getAllPaths()
            let allTitles= data.map(info=> info)
            let allPaths= allTitles.filter(info=> info.title.toLowerCase()===search)
            setOtherPaths(allPaths)
            if(!allPaths){setOtherPaths(data)}
          }

        return (
            <LayoutApp>
            <div style={{  display:'flex', flexDirection:'column', justifyContent:'content', width:'80%', marginLeft: '100px', marginRight: '100px', padding:'0 30px', backgroundColor:'	#DCDCDC'}}>



             {otherPaths?
                (
                    <div style={{borderRadius:' 20px ', margin:'10px', marginRight:'20px'}}>
                    <h1 style={{fontFamily:'Verdana', fontSize:'30px', paddingTop: '50px'}}><b>Find the best study paths</b></h1> 
                    {/* searchbar */}
                    <Search placeholder="input search text" onChange={onSearch} allowClear style={{ width: 500 }} />                               
                        <div style={{ display:'flex', flexDirection:'row', flexWrap: 'wrap' , justifyContent:'center' }}>    

                            {/* show only paths that interest user*/} 

                                {otherPaths?.map(path => (
                                    <div style={{borderRadius:' 20px ', margin:'10px',  width:'240px', marginRight:'20px'}}>
                                    <Card hoverable  style={{backgroundColor: 'white', borderRadius:'10px', boxShadow: '3px 4px 25px -7px rgba(0,0,0,0.75)', width:'260px'}} >
                                    <Card type="inner" style={{ color:'white', backgroundColor:'#0B648A', borderRadius:'5px'}}>
                                        <Link to={`/login`}> <h1 style={{ fontSize:'20px', color:'white'}}  >{path.title}</h1> </Link> 
                                  </Card>
                                    <Divider>Topics</Divider>
                                    <div style={{ padding: '1rem', display:'flex', flexDirection:'column', width:'350px' }} >
                                            {path.topics?.map((topic, index) => (
                                                <Card hoverable  style={{ marginTop:'15px', width:'180px', height:'70px', margin:'0px', padding:'0px', borderColor: '#1F79B5'}}  >
                                                    <Link to={`/login`}>
                                                    <b><p style={{ margin:'0px', padding:'0px', fontWeight:'lighter', color:'gray'}}>{topic.title}</p></b>
                                                    </Link>
                                             
                                                </Card> 
                                            ))}
                                    </div>
                                    </Card>    
                                    </div>   
                                    ))}                                
                        </div>
                    </div>
                ):( 
                    <Skeleton active />
                )}
                
        </div>
        </LayoutApp>

        )
    }
export default DiscoverPaths
