import React, {useState, useEffect}from 'react'
import { Typography, Button, Modal, Form,  Card, Divider, Skeleton, Collapse, Progress} from 'antd'
import { Link } from 'react-router-dom'
import { useContextInfo } from '../../hooks/context.js'
import {createSubscription} from '../../services/suscriptions'
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
            const {data} = await getSingleUser(user._id)
            const subsAll= data.suscriptions.map(user=> user.paths) 

            let allPathsdata=[]
            const {data: suscriberspaths} = await getAllPaths()

            for (const element of subsAll){
                for (const all of element){
                    const userPaths = suscriberspaths.filter((info)=>
                    info._id === all)
                    setInfo(info?  [info, ...userPaths]: [...userPaths])
                    allPathsdata= info?  [info, ...userPaths]: [...userPaths]
                    console.log(allPathsdata, 'create path')

                }
            }                   
        }
        getPaths()
           
        }, [changes])

    return (
        <div>
        {info?.map(path=>
        <div>
        <h1>{path.title}</h1>
        <p>{path.category}</p>
        <p>{path.level}</p>

        </div>
        )}
            
        </div>
    )
}
export default SuscribersPaths