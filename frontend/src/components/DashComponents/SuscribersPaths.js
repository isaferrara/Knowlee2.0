import React, {useState, useEffect}from 'react'
import { Typography, Button, Modal, Form,  Card, Divider, Skeleton, Collapse, Progress} from 'antd'
import { useContextInfo } from '../../hooks/context.js'
import {createSubscription, getAllSuscribers, getSingleSuscriber} from '../../services/suscriptions'
import { getAllUsers, getSingleUser } from '../../services/auth.js'
import { getAllPaths } from '../../services/paths.js'
import { updateFn } from '../../services/auth.js'
import { getSinglePath } from '../../services/paths.js'
import {
    PlusSquareFilled
  } from '@ant-design/icons';

 const SuscribersPaths = () => {
    const [info, setInfo]= useState(null)
    const [pathsy, setPath] = useState(null)
    const [changes, setChanges] = useState(false);
    const { user } = useContextInfo()

    useEffect(() => {
        async function getPaths() {
            const {data} = await getAllSuscribers()

            //sacas los paths nuevos a los que ya  suscrito que tengan contenido
            const notSuscribed = data.filter((info)=>
            info.me === user._id)

            const pathsNotSuscribed = notSuscribed.slice(0,4).filter((info)=>
             info.paths.length>0)
             
             setPath(pathsNotSuscribed)    
        }
        getPaths()


        }, [changes])


        async function addPath(info){   
                //actualizas perfil para que se gurade en tu usuario la subs
                const allPaths= [...user.paths, info]
    
                const {data: updateUser} = await updateFn(user._id, {
                    email: user.email,
                    username: user.username,
                    password: user.password,
                    name: user.name,
                    suscribers: user.suscribers,
                    image: user.image, 
                    paths: allPaths,
                    suscriptions: user.suscriptions,
                    favorites: user.favorites
                })
                setChanges(!changes)
            }

    return (
        <div> 
        <Divider style={{color:'#A6A6A4', fontSize:'20px'}}>Your subscriptions</Divider>
        <div style={{display:'flex', flexDirection:'row', color:'#8F8D88', display:'flex', justifyContent:'space-around', }}>
        {pathsy? <> {pathsy.map(info=> 

        //{/* start card */}
        <div style={{ width:'230px', height:'290px',  margin:'0',  backgroundColor:'white', borderRadius:'10px'}}>

        <div style={{  margin:'20px'}}>

        {/* image username and short description */}
        <div style={{display:'flex', flexDirection:'column', justifyContent:'space-around', textAlign:'left', alignItems:'center'}}>
         {/* image */}
        <div style={{width:'83px', height:'83px', borderRadius: '50%', border: '3px solid rgba(50, 94, 122, 0.5)', display:'flex',  alignContent:'center',  alignItems:'center', alignItems:'center'}}>
            <img alt="icon" src={info.user.image} style={{width:'90%', height:'90%', margin:'auto', borderRadius: '50%'}}/>
        </div>

        {/* username and subscribers */}
            <div style={{display:'flex', flexDirection:'column', justifyContent:'space-around', margin:'10px', textAlign:'center'}}>
                <p style={{  marginBottom:'0', lineHeight:'17px'}}><b>{info.user.username}</b></p> 
                <p style={{  marginBottom:'0', lineHeight:'10px'}}><small>{info.user.suscribers.length} subscribers </small></p>
            </div>
             {/* <PlusSquareFilled  onClick={()=>addPath(info)} style={{ color: bottonColor(info)}}/> */}
        </div>

            <div style={{display:'flex', flexDirection:'column', justifyContent:'space-around'}}>
                <p style={{textDecoration:'underline',  marginBottom:'0', width:'100%'}}> <b>{info.paths[0].title}</b></p>
                <div style={{textAlign:'left'}}>
                <div style={{height:'50px'}}>
                    <p style={{ lineHeight:'15px', marginBottom:'12px', marginTop:'10px'}}><small>{info.paths[0].shortDesc}</small></p> 
                </div>

                <div style={{position:'relative'}}>
                <hr style={{height:'0.5px', backgroundColor: '#DAD7E0', border: '0 none'}}/>
                    <p style={{marginBottom:'0', lineHeight:'15px',  fontWeight:'100'}}> <small>{info.paths[0].category}</small></p> 
                    <p style={{marginBottom:'0', lineHeight:'15px',  fontWeight:'100'}}><small>{info.paths[0].level}</small></p>
                </div>
                </div>
            </div>

              </div>
          </div>
         )} </> : <p>No paths </p>}  
        </div>
        </div>
    )
}
export default SuscribersPaths