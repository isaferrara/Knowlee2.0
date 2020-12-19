import React, {useState, useEffect}from 'react'
import { Typography, Button, Modal, Form,  Card, Divider, Skeleton, Progress} from 'antd'
import { Link } from 'react-router-dom'
import { useContextInfo } from '../../hooks/context.js'
import {getSingleSuscriber} from '../../services/suscriptions'
import { getAllUsers, getSingleUser } from '../../services/auth.js'
import { getAllSuscribers } from '../../services/suscriptions.js'
import { updateFn } from '../../services/auth.js'

const UserSuscriptions = () => {
    const [subs, setSubs]= useState(null)
    const [info, setInfo]= useState(null)
    const { user } = useContextInfo()
    const [changes, setChanges] = useState(false);


    useEffect(() => {

        async function getPaths() {
            

            // let a= user.suscriptions.map(user=>user)
            // const {data} = await getSingleUser(user._id)
            // console.log(data, 'data') 

            // let mySubs= data.suscriptions.map(us => us)

            // let idArraySubs= mySubs.map((users) => users.users)
            // let idASubs= idArraySubs.map(users => users)

            // console.log(mySubs, 'subs') 

            // for (let i=0; i<idArraySubs.length; i++){
            //     const {data: subs} = await getSingleSuscriber(idArraySubs[i][0])
            //     console.log(subs, 'only data') 
            //     console.log(idArraySubs[i][0], 'user') 
            // }
           

            // setInfo(mySubs)      
        }
        getPaths()
           
        }, [changes])


    return (
        <div>
        {info ? 
        (<div>
        {/* {info.map(subs=>  <p>{subs.suscriptions}</p>)} */}
        </div>):(<div>  
        <Skeleton/>
        </div>
        )}
        </div>
    )
}

export default UserSuscriptions