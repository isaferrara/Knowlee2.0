import React, {useState, useEffect}from 'react'
import { Typography, Button, Modal, Form,  Card, Divider, Skeleton, Collapse, Progress} from 'antd'
import { Link } from 'react-router-dom'
import { useContextInfo } from '../../hooks/context.js'
import {createSubscription, getAllSuscribers, getSingleSuscriber} from '../../services/suscriptions'
import { getAllUsers, getSingleUser } from '../../services/auth.js'
import { getAllPaths } from '../../services/paths.js'
import { updateFn } from '../../services/auth.js'
import { getSinglePath } from '../../services/paths.js'
const { Panel } = Collapse;

//aqui se encuentran todas las suscripciones del usuarios 

const UserSuscriptions = () => {
    const [info, setInfo]= useState(null)
    const [pathsy, setPath] = useState(null)
    const [changes, setChanges] = useState(false);
    const { user } = useContextInfo()
    let arrayId=[]

    useEffect(() => {
        async function getPaths() {
            const {data} = await getAllSuscribers()
            const {data: pather} = await getAllPaths()

            //sacas los subs nuevos a los que ya  suscrito 
            const pathsSuscribedsuscribed = data.filter((info)=>
            info.me === user._id)

            //sacas los subs nuevos a los que ya  suscrito que tengan paths
            const pathsSuscribed = pathsSuscribedsuscribed.filter((info)=>
             info.paths.length>0)   

             console.log(pathsSuscribed);
            //sacas los id de los paths de los subs nuevos
            const pathsSuscribedss= pathsSuscribed.map((info)=>
             info.paths.map(a=> arrayId= arrayId.concat(a._id)))   

             console.log(pathsSuscribedss);

            //sacas los paths nuevos de tus sucripciones

               // console.log(pathsSuscribedss[pathsSuscribedss.length-1][0], 'suscrasdibed');     
            // Esto es el ultimo array de todas las ids de los paths de los subs 
            // se pone así porque tienes que elegir el acumulado
            // luego checas si se encuentra aqui la id del path
            // en pocas palabras comparas subs/path/id con path/id

            const suscribedPaths= pather.filter((infos)=>
            pathsSuscribedss[pathsSuscribedss.length-1][0].includes(infos._id))

            console.log(suscribedPaths);

             setPath(suscribedPaths)    
        }
        getPaths()


        }, [changes])

      
    return (
        <div> 
        <Divider style={{color:'#A6A6A4', fontSize:'20px'}}>Your subscriptions</Divider>
        <div style={{display:'flex', flexDirection:'row', color:'#8F8D88', display:'flex', justifyContent:'space-around', }}>
        {pathsy?<> {pathsy.map(info => 

        //{/* start card */}
        <div style={{ width:'230px', height:'290px',  margin:'0',  backgroundColor:'white', borderRadius:'10px'}}>

        <div style={{  margin:'20px'}}>
            <div style={{display:'flex', flexDirection:'column', justifyContent:'space-around'}}>

            
            {/* image username and short description */}
            <div style={{display:'flex', flexDirection:'column', justifyContent:'space-around', textAlign:'left', alignItems:'center'}}>
                {/* image */}
                <div style={{width:'83px', height:'83px', borderRadius: '50%', border: '3px solid rgba(50, 94, 122, 0.5)', display:'flex',  alignContent:'center',  alignItems:'center', alignItems:'center'}}>
                    <img alt="icon" src={info.users[0].image} style={{width:'90%', height:'90%', margin:'auto', borderRadius: '50%'}}/>
                </div>

            {/* username and subscribers */}
                <div style={{display:'flex', flexDirection:'column', justifyContent:'space-around', margin:'10px', textAlign:'center'}}>
                    <p style={{  marginBottom:'0', lineHeight:'17px'}}><b>{info.users[0].username}</b></p> 
                    <p style={{  marginBottom:'0', lineHeight:'10px'}}><small>{info.users[0].suscribers.length} subscribers </small></p>
                </div>
            </div>

                <p style={{textDecoration:'underline',  marginBottom:'0', width:'100%'}}>  <b>{info.title}</b></p>
                <div style={{textAlign:'left'}}>
                        <div style={{height:'50px'}}>
                        <p style={{ lineHeight:'15px', marginBottom:'12px', marginTop:'10px'}}><small> {info.shortDesc}</small></p>
                        </div>

                        <div style={{position:'relative'}}>
                            <hr style={{height:'0.5px', backgroundColor: '#DAD7E0', border: '0 none'}}/>

                                <p style={{marginBottom:'0', lineHeight:'15px',  fontWeight:'100'}}> <small> {info.category}</small></p> 
                                <p style={{marginBottom:'0', lineHeight:'15px',  fontWeight:'100'}}><small> {info.level}</small></p>
                        </div>
                </div>
            </div>

              </div>
          </div>
         )} </> : <p>No paths </p>
         }  

        </div>

        </div>
    )
}

export default UserSuscriptions


