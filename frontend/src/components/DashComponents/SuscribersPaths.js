import React, {useState, useEffect}from 'react'
import { Typography, Button, Modal, Form,  Card, Divider, Skeleton, Collapse, Progress} from 'antd'
import { Link } from 'react-router-dom'
import { useContextInfo } from '../../hooks/context.js'
import {createSubscription, getAllSuscribers, getSingleSuscriber} from '../../services/suscriptions'
import { getAllUsers, getSingleUser } from '../../services/auth.js'
import { getAllPaths } from '../../services/paths.js'
import { updateFn } from '../../services/auth.js'
import { getSinglePath } from '../../services/paths.js'


 const SuscribersPaths = () => {
    const [info, setInfo]= useState(null)
    const [pathsy, setPath] = useState(null)
    const [changes, setChanges] = useState(false);
    const { user } = useContextInfo()

    useEffect(() => {
        async function getPaths() {
            const {data} = await getAllSuscribers()
            const notSuscribed = data.filter((info)=>
            info.me !==user._id)

            const pathsNotSuscribed = notSuscribed.filter((info)=>
             info.paths.length>0)

             setPath(pathsNotSuscribed)    
        }
        getPaths()
           
        }, [changes])


        async function suscribeUser(values){   
            const allSubscribers= [...values.suscribers, user]
    
            const {data: updateUsera} = await updateFn(values._id, {
                email: values.email,
                username: values.username,
                password: values.password,
                name: values.name,
                suscribers: allSubscribers,
                image: values.image, 
                paths: values.paths,
                suscriptions: values.suscriptions,
                favorites: values.favorites
            })
    
                //actualizas perfil para que se gurade en tu usuario la subs
                const allSuscriptions= [...user.suscriptions, values]
    
                const {data: updateUser} = await updateFn(user._id, {
                    email: user.email,
                    username: user.username,
                    password: user.password,
                    name: user.name,
                    suscribers: user.suscribers,
                    image: user.image, 
                    paths: user.paths,
                    suscriptions: allSuscriptions,
                    favorites: user.favorites
                })

                const {data: createSub} = await createSubscription({
                    myId: user._id,
                    userId: values,
                    pathId: values.paths
                    
                })
                setChanges(!changes)
            }


    return (
        <div>
        {pathsy? <> {pathsy.map(info=> 
         <div style={{border:'1px solid black'}}>
{/*          
         {info.paths.map( path=>
         <>
        <p>{path.title}</p>
         <p>{path.shortDesc} </p>
         <p>{path.category} </p>
         <p>{path.category} </p>
         </>
         )} */}
         <p>{info.user.username}</p>
         <p>{info.user.paths.length} paths</p>
         <p>{info.user.suscribers.length} subscribers</p>

         <p>{info.paths[0].title}</p>
         <p>{info.paths[0].category}</p>
         <p>{info.paths[0].level}</p>
         <p>{info.paths[0].shortDesc}</p>


         <Button onClick={()=> suscribeUser(info.user)} >Suscribe</Button>

          </div>
         )} </> : <p>No paths </p>}  
        </div>
    )
}
export default SuscribersPaths