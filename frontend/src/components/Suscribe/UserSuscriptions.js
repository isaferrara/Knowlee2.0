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


const UserSuscriptions = () => {
    const [path, setPath]= useState([])
    const { user } = useContextInfo()
    const [changes, setChanges] = useState(false);
    const [info, setInfo]= useState(null)


    useEffect(() => {

        async function getPaths() {
            const {data} = await getAllSuscribers()
            console.log(data, 'all subs')

            const Pathsy = data.filter((info)=>
            info.me===user._id)
            console.log(Pathsy, 'all my subs')
            setPath(Pathsy)    
                
        }
        getPaths()
           
        }, [changes])

    return (
        <div>
        <Divider>Your subscriptions</Divider>
        {path? <> {path.map(info=> 
         <>
         <p>{info.user.username}</p>
         <p>{info.user.paths.length} paths</p>
         <p>{info.user.suscribers.length} subscribers</p>
        )
        {info.paths.map(path=> <>
            <p>{path.title}</p>
            <p>{path.level}</p>
            <p>{path.topics.length} topics</p>
        </>)}
          </>
         )} </> : <p>No paths </p>}  
        </div>
    )
}

export default UserSuscriptions



//         async function getPaths() {
//     const {data} = await getSingleUser(user._id)
//     const subsAll= data.suscriptions.map(user=> user.paths) 
//     // console.log(subsAll, 'dara')


//     const {data: isa} = await getSingleSuscriber('5fdfa71f67daaf7031f21bb8')
//     console.log(isa, 'single dsub')

//     let allPathsdata=[]
//     const {data: suscriberspaths} = await getAllPaths()
//     // console.log(suscriberspaths, 'subs path')

//     for (const element of subsAll){
//         for (const all of element){
//             const userPaths = suscriberspaths.filter((info)=>
//             info._id === all)
//             allPathsdata= info?  [info, ...userPaths]: [...userPaths]
//         }
//     }
        
// }


       