import React, {useState}from 'react'
import { HeartOutlined, HeartFilled} from '@ant-design/icons';
import { useContextInfo } from '../../hooks/context.js'
import {  getSingleTopic } from '../../services/topics'
import { updateFn } from '../../services/auth'


const FavTopic = (props) => {
const [fav, setFav]= useState(false)
const { user } = useContextInfo()

async function changeFav(){
    setFav(!fav)

const {data} = await getSingleTopic(props._id) 

async function createFav(){
    const favorSingle= {...data}

    await updateFn(user._id,{
        username: user.username, 
        name: user.name, 
        email: user.email, 
        suscriptions: user.suscriptions, 
        image: user.image, 
        paths: user.paths,
        subscribers: user.subscribers, 
        favorites: favorSingle, 
    })
    }    
    createFav()
}
    
    return (
        <div>
            {fav? <HeartFilled onClick={changeFav} /> : <HeartOutlined onClick={changeFav}/>}
        </div>
    )
}

export default FavTopic