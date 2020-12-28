import React, {useState, useEffect}from 'react'
import { Input,  Divider, Collapse} from 'antd'
import { Link } from 'react-router-dom'
import { useContextInfo } from '../../hooks/context.js'
import { getAllSuscribers } from '../../services/suscriptions'
import { getAllUsers } from '../../services/auth.js'
import { getAllPaths } from '../../services/paths.js'



//aqui se encuentran todas las suscripciones del usuarios 

const UserSuscriptions = () => {
    const [info, setInfo]= useState(false)
    const [pathsy, setPath] = useState(null)
    const [changes, setChanges] = useState(false);
    const [users, setUsers] = useState(null);
    const [otherPaths, setOtherPaths] = useState(null)
    const [allMyPathsy, setallMyPathsy] = useState(null)


    const { user } = useContextInfo()
    let arrayId=[]

    useEffect(() => {
        async function getPaths() {
            const {data} = await getAllSuscribers()
            const {data: pather} = await getAllPaths()
            const {data: allUsers} = await getAllUsers()


            const notMe = allUsers.filter((info)=>
            info._id !== user._id )

            //a estos todavia no me suscribo
            const notSuscribed = notMe.filter((info)=>
            user.suscriptions.includes(info._id)
            )

            setUsers(notSuscribed)
            
            //sacas los subs nuevos a los que ya  suscrito 
            const pathsSuscribedsuscribed = data.filter((info)=>
            info.me === user._id)

            //sacas los subs nuevos a los que ya  suscrito que tengan paths
            const pathsSuscribed = pathsSuscribedsuscribed.filter((info)=>
             info.paths.length>0)   

            //sacas los id de los paths de los subs nuevos
            const pathsSuscribedss= pathsSuscribed.map((info)=>
             info.paths.map(a=> arrayId= arrayId.concat(a._id)))   

            //sacas los paths nuevos de tus sucripciones

            //    console.log(pathsSuscribedss[pathsSuscribedss.length-1][0], 'suscrasdibed');     
            // Esto es el ultimo array de todas las ids de los paths de los subs 
            // se pone así porque tienes que elegir el acumulado
            // luego checas si se encuentra aqui la id del path
            // en pocas palabras comparas subs/path/id con path/id

            const suscribedPaths= pather.filter((infos)=>
            pathsSuscribedss.length===0? setInfo(true) :  pathsSuscribedss[pathsSuscribedss.length-1][0].includes(infos._id)
            )

             setPath(suscribedPaths)   
             setOtherPaths(suscribedPaths)
             setallMyPathsy(suscribedPaths)

        }
        getPaths()
        }, [changes])

        function onSearch (value, info) {
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
        {info? <div> <h1> No subscriptions</h1></div> :
        <>            
        <Divider style={{color:'#A6A6A4', fontSize:'20px'}}>Your subscriptions</Divider>
        <div style={{display:'flex', flexDirection:'row', flexWrap:'wrap', justifyContent:'space-around', alignItems:'center'}}>
            {users?.map(usy=>
            
                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
                <div style={{ width:'230px', height:'190px',  margin:'0',  backgroundColor:'white', borderRadius:'10px', marginTop:'20px'}}>
                    <div style={{  margin:'20px'}}>
                                {/* image username and short description */}
                                <div style={{display:'flex', flexDirection:'column', justifyContent:'space-around', textAlign:'left', alignItems:'center'}}>
                                    {/* image */}
                                    <div style={{width:'83px', height:'83px', borderRadius: '50%', border: '3px solid rgba(50, 94, 122, 0.5)', display:'flex',  alignContent:'center',  alignItems:'center', alignItems:'center'}}>
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
                <div style={{width:'83px', height:'83px', borderRadius: '50%', border: '3px solid rgba(50, 94, 122, 0.5)', display:'flex',  alignContent:'center',  alignItems:'center', alignItems:'center'}}>
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
                <Link to={`/path/explore/${path._id}`}>
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
    )
}

export default UserSuscriptions


