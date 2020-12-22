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

            const  bottonColor= (info)=>{
                // switch(info.category) {
                //     case 'Web Dev':
                //       return 'black'
                //       break;
                //     case 'Ux/Ui':
                //       return 'pink'
                //       break;
                //     case 'Dev Ops':
                //         return 'gray'
                //         break; 
                //     case 'Data Science':
                //         return 'yellow'
                //         break;   
                //     case 'Cyber Security':
                //         return 'blue'
                //         break;             
                //     default:
                //         return 'green'
                //   }
            }
            bottonColor()

    return (
        <div> 
        <Divider style={{color:'#A6A6A4', fontSize:'20px'}}>Your subscriptions</Divider>
        <div style={{display:'flex', flexDirection:'row', color:'#8F8D88', display:'flex', justifyContent:'space-around', }}>
        {pathsy? <> {pathsy.map(info=> 
         <div style={{ width:'200px',  margin:'0',  backgroundColor:'white', borderRadius:'10px'}}>

         <div style={{  margin:'20px'}}>
         <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around', textAlign:'left', alignItems:'center'}}>
         <img alt="icon" src={info.user.image} style={{width:'55px', height:'55px', borderRadius: '50%'}}/>
            <div style={{display:'flex', flexDirection:'column', justifyContent:'space-around', margin:'10px'}}>
                <p style={{  marginBottom:'0', lineHeight:'17px'}}><b>{info.user.username}</b></p> 
                <p style={{  marginBottom:'0', lineHeight:'10px'}}><small>{info.user.suscribers.length} subscribers </small></p>
            </div>
             {/* <PlusSquareFilled  onClick={()=>addPath(info)} style={{ color: bottonColor(info)}}/> */}


        </div>
            <hr style={{height:'0.5px', color:'#DAD7E0', backgroundColor: '#DAD7E0', border: '0 none', marginTop:'10px'}}/>
            <div style={{display:'flex', flexDirection:'column', justifyContent:'space-around'}}>
                <p style={{textDecoration:'underline',  marginBottom:'0', width:'100%'}}> <b>{info.paths[0].title}</b></p>
                <div style={{textAlign:'left'}}>
                <p style={{fontSize:'14px', lineHeight:'15px', fontWeight:'100', marginBottom:'12px', marginTop:'10px'}}>{info.paths[0].shortDesc}</p> 
                    <p style={{marginBottom:'0', lineHeight:'15px'}}> <small><b>Category:</b>{info.paths[0].category}</small></p> 
                    <p style={{marginBottom:'0', lineHeight:'15px'}}><small><b>Level:</b>{info.paths[0].level}</small></p>
              
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