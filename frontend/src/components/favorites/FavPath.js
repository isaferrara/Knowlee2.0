import React, {useState, useEffect}from 'react'
import { HeartOutlined, HeartFilled} from '@ant-design/icons';
import { useContextInfo } from '../../hooks/context.js'
import { updateFn } from '../../services/auth'
import { getSinglePath } from '../../services/paths.js';

 const FavPath = (props) => {
    const [fav, setFav]= useState(false)
    const { user } = useContextInfo()
    
    async function changeFav(){
        setFav(!fav)

    const {data} = await getSinglePath(props._id) 

    async function createFav(){

        const {data: userUpd} =await updateFn(user._id,{
            email: user.email, 
            username: user.username, 
            name: user.name, 
            image: user.image, 
            paths: user.paths,
            suscriptions: user.suscriptions, 
            favorites: user.favorites
            }
        )
        console.log(userUpd, 'que pasa') 
        }    
        createFav()
    }

    return (
        <div>
            {fav? <HeartFilled onClick={changeFav} /> : <HeartOutlined onClick={changeFav}/>}
        </div>
    )
}
export default FavPath