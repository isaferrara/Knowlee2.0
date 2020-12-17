import React, {useState, useEffect}from 'react'
import { getAllPaths, updatePath, getSinglePath} from '../../services/paths.js'
import { Typography, Button, Modal, Form,  Card, Divider, Skeleton, Progress} from 'antd'
import { Link } from 'react-router-dom'
import { useContextInfo } from '../../hooks/context.js'
import { Input } from 'antd';
import CreatePath from '../../pages/CreatePath.js'
import { getAllUsers, getSingleUser } from '../../services/auth.js'

//AQUÍ SE ENCUENTRAN TODOS LOS USUARIOS DISPONIBLES PARA SUSCRIBIRTE
export const SuscribeExplore = () => {
    const [fav, setFav]= useState(null)
    const [info, setInfo]= useState(null)
    const { user } = useContextInfo()
    const [changes, setChanges] = useState(false);


    useEffect(() => {
        async function getPaths() {
            const {data} = await getAllUsers()
            setInfo(data) 
            console.log(data)
            
        }
        getPaths()
        }, [changes])




    return (
        <div>
        {info? 
        (<div>
            {info.map( user=>
            <Card
            style={{width:'200px'}}
            cover={<img alt="icon" src={user.image} style={{width:'50px', borderRadius: '50%'}}/>}
            >
            <h2>{user.username}</h2>
            <p>{user.paths.length} paths</p>
            {/* sacas todas las suscripciones y filtras solo los que tenagan el id del usuario */}
            <h1> suscribers</h1>
            <h1></h1>
        </Card>
        )}
        </div>    
        ):(<Skeleton/>)
    }
        </div>
    )
}
