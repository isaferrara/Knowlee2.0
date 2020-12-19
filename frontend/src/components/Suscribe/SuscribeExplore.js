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
    const [subs, setSubs]= useState(null)
    const [info, setInfo]= useState(null)
    const { user } = useContextInfo()
    const [changes, setChanges] = useState(false);
    const [form] = Form.useForm()


    useEffect(() => {
        async function getPaths() {
            const {data} = await getAllUsers()
            setInfo(data) 
       }
        getPaths()
        }, [changes])

    
    async function suscribeUser(values){


        // const {data: allSubs} = await getAllSuscribers()
        // let allUsers= allSubs.map(subs=> subs.users[0])
        // let allFiltered= allUsers.filter(subs=> subs._id===user._id)
        // console.log(allFiltered.length, 'id')


        //Cuando alguien me da click  ---subscribers


    
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

            //yyo le doy click y su perfil se guarda (suscription)
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
            {!users.suscribers.length? <p> 0 suscribers </p> : <p> {users.suscribers.length} suscribers </p>}

             <p> {users._id} suscribers </p>

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