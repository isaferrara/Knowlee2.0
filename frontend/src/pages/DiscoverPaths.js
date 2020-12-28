import React, {useState, useEffect}from 'react'
import { Divider} from 'antd'
import { Link } from 'react-router-dom'
import { useContextInfo } from '../hooks/context.js'
import { getAllUsers } from '../services/auth.js'

import LayoutApp from "../components/LayoutApp";


const DiscoverPaths = () => {
    const [info]= useState(false)
    const [pathsy] = useState(null)
    const [changes] = useState(false);
    const [users, setUsers] = useState(null);
    const [otherPaths] = useState(null)



    const { user } = useContextInfo()
    let arrayId=[]
    useEffect(() => {
        async function getPaths() {
            const {data: allUsers} = await getAllUsers()

            setUsers(allUsers.slice(0,3))
            
        }
        getPaths()
        }, [changes])

        function onSearch (value) {
            const results = pathsy.filter(path => path.title.toLowerCase().includes(value)) 
            if(value===''){
                setUsers(users)
            }else if(!results){
                setUsers(otherPaths)
            } else{
                setUsers(otherPaths)
            }      
        };

        return (
            <div> 
            <LayoutApp>
            <div style={{width: '900px'}} >
        {info? <div> <h1> No subscriptions</h1></div> :
        <>            
        <Divider style={{color:'#A6A6A4', fontSize:'20px', marginTop:'50px'}}>Featured users</Divider>
        <div style={{display:'flex', flexDirection:'row', flexWrap:'wrap', justifyContent:'space-around', alignItems:'center'}}>
            {users?.map(usy=>
            
                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
                <div style={{ width:'230px', height:'190px',  margin:'0',  backgroundColor:'white', borderRadius:'10px', marginTop:'20px'}}>
                    <div style={{  margin:'20px'}}>
                                {/* image username and short description */}
                                <div style={{display:'flex', flexDirection:'column', justifyContent:'space-around', textAlign:'left', alignItems:'center'}}>
                                    {/* image */}
                                    <div style={{width:'83px', height:'83px', borderRadius: '50%', border: '3px solid rgba(50, 94, 122, 0.5)', display:'flex',  alignContent:'center',  alignItems:'center'}}>
                                        <img alt="icon" src={usy.image} style={{width:'90%', height:'90%', margin:'auto', borderRadius: '50%'}}/>
                                    </div>
                                        {/* username and subscribers */}
                                        <div style={{display:'flex', flexDirection:'column', justifyContent:'space-around', margin:'10px', textAlign:'center'}}>
                                            <p style={{  marginBottom:'0', lineHeight:'17px'}}><b>{usy.username}</b></p> 
                                            <p style={{  marginBottom:'0', lineHeight:'10px'}}><small>{usy.suscribers.length} subscribers </small></p>
                                            <p style={{  marginBottom:'0', lineHeight:'10px'}}><small>{usy.paths.length} path </small></p>

                                        </div>
                                    </div>     
                    </div>
                </div>

            </div>
            )
            }
            </div>

        <div>
        
        {users?<> {users.map(info => 

        <div style={{ padding: '1rem 3rem', display:'flex', flexDirection:'column', justifyContent:'center', borderRadius:'20px', backgroundColor:'white', marginTop:'70px', boxShadow: '-1px 0px 19px -1px rgba(125,125,125,0.39)' }}>
        <div style={{display:'flex', flexDirection:'row',  justifyContent:'space-around', marginTop:'20px'}} >
            
            {/* search bar */}
            {/* <Search allowClear placeholder="What are you looking for?" onSearch={onSearch()} allowClear style={{ width: '600px', borderRadius:'3px', marginBottom: '20px', marginTop:'5px'}} />                        */}
        </div>


        <div style={{display:'flex', flexDirection:'column', justifyContent:'space-around'}}>

            
            {/* image username and short description */}
            <div style={{display:'flex', flexDirection:'column', justifyContent:'space-around', textAlign:'left', alignItems:'center'}}>
                {/* image */}
                <div style={{width:'83px', height:'83px', borderRadius: '50%', border: '3px solid rgba(50, 94, 122, 0.5)', display:'flex',   alignItems:'center', alignItems:'center'}}>
                    <img alt="icon" src={info.image} style={{width:'90%', height:'90%', margin:'auto', borderRadius: '50%'}}/>
                </div>

            {/* username and subscribers */}
                <div style={{display:'flex', flexDirection:'column', justifyContent:'space-around', margin:'10px', textAlign:'center'}}>
                    <p style={{  marginBottom:'0', lineHeight:'17px'}}><b>{info.username}</b></p> 
                    <p style={{  marginBottom:'0', lineHeight:'10px'}}><small>{info.suscribers.length} subscribers </small></p>
                </div>
            </div>

            {info.paths?.map(path=>
            <>
                <Link to={`/login`}>
                    <div type="inner" style={{ color:'#EDECEB', backgroundColor:'#f7f7f5', borderRadius:'20px', marginTop:'20px',  height:'80px'}}>
                        <div style={{marginLeft:'105px',  textAlign:'left'}}>
                            <h2 style={{fontFamily:'arial', color:'#999897', fontSize:'18px', lineHeight:'13px', paddingTop:'30px'}}> {path.title}</h2>
                            <p style={{  marginBottom:'0',color:'#999897', lineHeight:'10px'}}><small>{path.topics.length} topics </small></p>

                        </div>
                    </div> 
                </Link> 
                </>
            )}
       
                </div>
              </div>
         )} </> : <p>No paths </p>
         }  
         </div>
     
        </>
            }
            </div>
            </LayoutApp>
        </div>

        )
    }
export default DiscoverPaths
