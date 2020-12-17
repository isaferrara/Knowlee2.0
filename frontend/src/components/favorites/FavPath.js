import React, {useState, useEffect}from 'react'
import { HeartOutlined, HeartFilled} from '@ant-design/icons';
import { useContextInfo } from '../../hooks/context.js'
import { updateFn } from '../../services/auth'
import { createFav, deleteFav} from '../../services/favs.js';
import { updatePath } from '../../services/paths'

 const FavPath = (props) => {
    const [fav, setFav]= useState(null)
    const { user } = useContextInfo()
    const [newFavs, setNewFavs]= useState(null)
    let path= [props.isFav]

    useEffect(() => {
        let a= path.map(favs=> setFav(favs))
      },[])
  

    //favorite
    async function changeFav(){
    setFav(!fav)
    const {data}= await createFav({ userId:user, pathId:props })
    setNewFavs(data._id)

    const {data: upData}=await updatePath (props._id, 
        {
         title: props.title,
         description: props.description,
         shortDesc: props.shortDesc,
         isFav: true,
         progress: props.progress,
         level: props.level,
         category: props.category,
         topics: props.topics,
         users: props.users
        })

    }

    //unfavorite
    async function changeNotFav(){
        setFav(!fav)
        const allFav= [...user.favorites]
        let favsFiltered = allFav.filter(fav=> fav!== newFavs)

        await updateFn(user._id,{
            username: user.username, 
            name: user.name, 
            email: user.email, 
            image: user.image, 
            paths: user.paths,
            suscriptions: user.suscriptions, 
            favorites: favsFiltered, 
        })

        const {data: upData}=await updatePath (props._id, 
            {
             title: props.title,
             description: props.description,
             shortDesc: props.shortDesc,
             isFav: false,
             progress: props.progress,
             level: props.level,
             category: props.category,
             topics: props.topics,
             users: props.users
            })
            // const {data: favDel}= await deleteFav(newFavs)
        }


    return (
        <div>
        {fav? <HeartFilled onClick={changeNotFav} /> : <HeartOutlined onClick={changeFav}/> }
        </div>
    )
}
export default FavPath