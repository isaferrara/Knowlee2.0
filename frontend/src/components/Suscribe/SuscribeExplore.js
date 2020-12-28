import React, {useState, useEffect}from 'react'
import { Divider, Button, Form} from 'antd'
import { useContextInfo } from '../../hooks/context.js'
import { createSubscription} from '../../services/suscriptions'
import { getAllUsers } from '../../services/auth.js'
import { updateFn } from '../../services/auth.js'

//AQUÍ SE ENCUENTRAN TODOS LOS USUARIOS DISPONIBLES PARA SUSCRIBIRTE

const SuscribeExplore = () => {
    const [info, setInfo]= useState(null)
    const { user } = useContextInfo()
    const [changes, setChanges] = useState(false);


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

        await updateFn(values._id, {
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
           
            await createSubscription({
                myId: user._id,
                userId: values,
                pathId: values.paths
                
            })
            setChanges(!changes)
        }

    return (
        <div>
        <Divider style={{color:'#A6A6A4', fontSize:'20px'}}>Find new Users</Divider>

        {info?.length>5 ? setInfo(info.slice(-5)):
            (<div style={{display:'flex', flexDirection:'row', color:'#8F8D88', display:'flex', justifyContent:'space-around' }}>

                {info?.map( users=>

                <div style={{ width:'200px', height:'220px',  margin:'0',  backgroundColor:'white', borderRadius:'10px'}}>
                    <div style={{  margin:'20px'}}>

                        <div style={{display:'flex', flexDirection:'column', justifyContent:'space-around', textAlign:'left', alignItems:'center'}}>

                            <div style={{width:'83px', height:'83px', borderRadius: '50%', border: '3px solid rgba(50, 94, 122, 0.5)', display:'flex',  alignContent:'center',  alignItems:'center', alignItems:'center'}}>
                                <img alt="icon" src={users.image} style={{width:'90%', height:'90%', margin:'auto', borderRadius: '50%'}}/>
                            </div>

                            <div style={{display:'flex', flexDirection:'column', marginBottom:'20px', justifyContent:'space-around', margin:'10px', textAlign:'center'}}>
                                <p style={{  marginBottom:'0', lineHeight:'17px'}}><b>{users.username}</b></p> 
                                <p style={{  marginBottom:'0', lineHeight:'10px'}}><small>{users.suscribers.length} subscribers </small></p>       
                                <p style={{  marginBottom:'0', lineHeight:'10px'}}><small>{users.paths.length} paths created </small></p>
                            </div>
                        <Button onClick={()=> suscribeUser(users)} >Suscribe</Button>
                        </div>
                    </div>
                </div>
                )}
            </div>    
            )
        }
        </div>
    )
}

export default SuscribeExplore