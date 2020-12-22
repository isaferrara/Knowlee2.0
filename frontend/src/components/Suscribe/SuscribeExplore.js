import React, {useState, useEffect}from 'react'
import { Typography, Button, Modal, Form,  Card, Checkbox, Skeleton, Progress, Input} from 'antd'
import { Link } from 'react-router-dom'
import { useContextInfo } from '../../hooks/context.js'
import {createSuscriber, createSubscription} from '../../services/suscriptions'
import { getAllUsers, getSingleUser } from '../../services/auth.js'
import { getAllSuscribers } from '../../services/suscriptions.js'
import { updateFn } from '../../services/auth.js'

//AQUÍ SE ENCUENTRAN TODOS LOS USUARIOS DISPONIBLES PARA SUSCRIBIRTE

const SuscribeExplore = () => {
    const [users, setUsers]= useState(null)
    const [info, setInfo]= useState(null)
    const { user } = useContextInfo()
    const [changes, setChanges] = useState(false);
    const [form] = Form.useForm()


    useEffect(() => {
        async function getPaths() {
            const {data} = await getAllUsers()
            const notMe = data.filter((info)=>
            info._id !== user._id )

            //a estos todavia no me suscribo
            const notSuscribed = notMe.filter((info)=>
            !user.suscriptions.includes(info._id)
            )

            setInfo(notSuscribed) 
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
        {info? 
        (<div>
            {info.map( users=>
            <Card
            style={{width:'200px'}}
            cover={<img alt="icon" src={users.image} style={{width:'50px', borderRadius: '50%'}}/>} >
            <h2>{users.username}</h2>
             <p>{users.paths.length} paths</p>
            <p>{users.suscribers.length} suscribers </p>
             <Button onClick={()=> suscribeUser(users)} >Suscribe</Button>
            
        </Card>
        )}
        </div>    
        ):(<Skeleton/>)
    }
        </div>
    )
}

export default SuscribeExplore